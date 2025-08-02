package com.ttoannguyen.lemongrass.service.impl;

import co.elastic.clients.elasticsearch.ElasticsearchAsyncClient;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.instruction.InstructionCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeUpdateRequest;
// import com.ttoannguyen.lemongrass.dto.Request.tag.TagCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.*;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
// import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import com.ttoannguyen.lemongrass.mapper.RecipeMapper;
import com.ttoannguyen.lemongrass.repository.*;
import com.ttoannguyen.lemongrass.search.document.RecipeDocument;
import com.ttoannguyen.lemongrass.service.CloudinaryService;
import com.ttoannguyen.lemongrass.service.RecipeService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecipeServiceImpl implements RecipeService {

  ElasticsearchAsyncClient elasticsearchAsyncClient;
  RecipeMapper recipeMapper;
  ObjectMapper objectMapper = new ObjectMapper();
  ImageRepository imageRepository;
  RecipeRepository recipeRepository;
  CloudinaryService cloudinaryService;
  CategoryRepository categoryRepository;
  AccountRepository accountRepository;
  IngredientRepository ingredientRepository;
  InstructionRepository instructionRepository;
  IngredientUnitRepository ingredientUnitRepository;
  IngredientTemplateRepository ingredientTemplateRepository;

  @Override
  @Transactional
  public RecipeResponse create(RecipeCreationRequest request, String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Recipe recipe = buildBaseRecipe(request, account);
    recipeRepository.save(recipe);

    if (request.getCategoryIds() != null) {
      log.info("Resolving categories: {}", request.getCategoryIds());
      List<Category> categories = resolveCategories(request.getCategoryIds());
      log.info("Categories resolved: {}", categories);
      recipe.setCategories(new ArrayList<>(categories));
      log.info("Categories set on recipe, type: {}", recipe.getCategories().getClass().getName());
      categories.forEach(
          category -> {
            log.info("Updating category {} recipes", category.getId());
            if (category.getRecipes() == null) {
              log.info("Initializing recipes for category {}", category.getId());
              category.setRecipes(new ArrayList<>());
            }
            log.info(
                "Category recipes type before add: {}", category.getRecipes().getClass().getName());
            category.getRecipes().add(recipe);
          });
      log.info("Saving categories");
      categoryRepository.saveAll(categories);
      log.info("Categories saved");
    }

    if (request.getIngredients() != null) {
      log.info("Building ingredients: {}", request.getIngredients());
      List<Ingredient> ingredients = buildIngredients(request.getIngredients(), recipe);
      ingredientRepository.saveAll(ingredients);
      recipe.setIngredients(new ArrayList<>(ingredients));
      log.info("Ingredients set, type: {}", recipe.getIngredients().getClass().getName());
    }

    if (request.getInstructions() != null) {
      log.info("Building instructions: {}", request.getInstructions());
      List<Instruction> instructions = buildInstructions(request.getInstructions(), recipe);
      instructionRepository.saveAll(instructions);
      recipe.setInstructions(new ArrayList<>(instructions));
      log.info("Instructions set, type: {}", recipe.getInstructions().getClass().getName());
    }

    if (request.getImages() != null) {
      log.info("Uploading images: {}", request.getImages());
      List<Image> images = uploadImages(request.getImages(), recipe, null);
      imageRepository.saveAll(images);
      recipe.setImages(new ArrayList<>(images));
      log.info("Images set, type: {}", recipe.getImages().getClass().getName());
    }

    log.info("Converting recipe to document for Elasticsearch!");
    RecipeDocument document;
    try {
      document = mapToDocument(recipe, account);
      log.info("RecipeDocument created: {}", document.getId());
      String prettyJson =
          objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(document);
      System.out.println(prettyJson);

    } catch (Exception e) {
      log.error(
          "Failed to create RecipeDocument for recipe {}: {}", recipe.getId(), e.getMessage(), e);
      throw new AppException(ErrorCode.RECIPE_DOCUMENT_CREATION_FAILED);
    }

    log.info("Starting async indexing for recipe: {}", recipe.getId());
    CompletableFuture.runAsync(
        () -> {
          try {
            IndexResponse response =
                elasticsearchAsyncClient
                    .index(i -> i.index("recipes").id(recipe.getId()).document(document))
                    .get();
            log.info(
                "- Async indexed recipe {} in Elasticsearch with result: {}",
                recipe.getId(),
                response.result());
          } catch (Exception e) {
            log.error(
                "- Failed to async index recipe {} in Elasticsearch: {}",
                recipe.getId(),
                e.getMessage());
          }
        });

    return recipeMapper.toRecipeResponse(recipe);
  }

  @Override
  @Transactional
  public RecipeResponse update(RecipeUpdateRequest request, String username) {
    log.info("Starting recipe update for ID: {}, username: {}", request.getId(), username);

    log.info("Fetching account for username: {}", username);
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Recipe recipe =
        recipeRepository
            .findById(request.getId())
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
    if (!recipe.getAccount().getId().equals(account.getId())) {
      log.error("User {} not authorized to update recipe {}", username, request.getId());
      throw new AppException(ErrorCode.UNAUTHORIZED);
    }
    recipe.setTitle(request.getTitle());
    recipe.setCookingTime(request.getCookingTime());
    recipe.setDifficulty(request.getDifficulty());
    recipe.setDescription(request.getDescription());
    recipe.setServings(request.getServings());
    recipeRepository.save(recipe);

    //    if (request.getTags() != null) {
    //      recipe.getTags().clear();
    //      Set<Tag> tags = resolveTags(request.getTags());
    //      recipe.setTags(new HashSet<>(tags));
    //      log.info("Tags updated, type: {}", recipe.getTags().getClass().getName());
    //    }

    if (request.getCategoryIds() != null) {
      recipe
          .getCategories()
          .forEach(
              category -> {
                log.info("Removing recipe {} from category {}", recipe.getId(), category.getId());
                if (category.getRecipes() != null) {
                  category.getRecipes().remove(recipe);
                }
              });
      categoryRepository.saveAll(recipe.getCategories());
      recipe.getCategories().clear();
      log.info("Resolving new categories: {}", request.getCategoryIds());
      List<Category> categories = resolveCategories(request.getCategoryIds());
      recipe.setCategories(new ArrayList<>(categories));
      categories.forEach(
          category -> {
            if (category.getRecipes() == null) {
              category.setRecipes(new ArrayList<>());
            }
            category.getRecipes().add(recipe);
          });
      categoryRepository.saveAll(categories);
    }

    if (request.getIngredients() != null) {
      ingredientRepository.deleteAll(recipe.getIngredients());
      recipe.getIngredients().clear();
      List<Ingredient> ingredients = buildIngredients(request.getIngredients(), recipe);
      ingredientRepository.saveAll(ingredients);
      recipe.setIngredients(new ArrayList<>(ingredients));
    }

    if (request.getInstructions() != null) {
      instructionRepository.deleteAll(recipe.getInstructions());
      recipe.getInstructions().clear();
      List<Instruction> instructions = buildInstructions(request.getInstructions(), recipe);
      instructionRepository.saveAll(instructions);
      recipe.setInstructions(new ArrayList<>(instructions));
    }

    if (request.getImages() != null) {
      imageRepository.deleteAll(recipe.getImages());
      recipe.getImages().clear();
      List<Image> images = uploadImages(request.getImages(), recipe, null);
      imageRepository.saveAll(images);
      recipe.setImages(new ArrayList<>(images));
    }

    log.info("Converting recipe to document for Elasticsearch");
    RecipeDocument document;
    try {
      document = mapToDocument(recipe, account);
      log.info("RecipeDocument (update) created: {}", document.getId());
    } catch (Exception e) {
      log.error(
          "Failed to create RecipeDocument for recipe {}: {}", recipe.getId(), e.getMessage(), e);
      throw new AppException(ErrorCode.RECIPE_DOCUMENT_CREATION_FAILED);
    }

    log.info("- Starting async (update) indexing for recipe: {}", recipe.getId());
    CompletableFuture.runAsync(
        () -> {
          try {
            IndexResponse response =
                elasticsearchAsyncClient
                    .index(i -> i.index("recipes").id(recipe.getId()).document(document))
                    .get();
            log.info(
                "Async indexed recipe {} in Elasticsearch with result: {}",
                recipe.getId(),
                response.result());
          } catch (Exception e) {
            log.error(
                "Failed to async index recipe {} in Elasticsearch: {}",
                recipe.getId(),
                e.getMessage());
          }
        });

    log.info("Returning recipe updated response");
    return recipeMapper.toRecipeResponse(recipe);
  }

  @Override
  @Transactional
  public String delete(String recipeId, String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    Recipe recipe =
        recipeRepository
            .findById(recipeId)
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));

    if (!recipe.getAccount().getId().equals(account.getId())) {
      log.error("User {} not authorized to delete recipe {}", username, recipeId);
      throw new AppException(ErrorCode.UNAUTHORIZED);
    }
    recipe.setIsDeleted(true);
    recipeRepository.save(recipe);

    RecipeDocument document;
    try {
      document = mapToDocument(recipe, account);
    } catch (Exception e) {
      log.error(
          "Failed to create RecipeDocument for recipe {}: {}", recipe.getId(), e.getMessage(), e);
      throw new AppException(ErrorCode.RECIPE_DOCUMENT_CREATION_FAILED);
    }

    CompletableFuture.runAsync(
        () -> {
          try {
            IndexResponse response =
                elasticsearchAsyncClient
                    .index(i -> i.index("recipes").id(recipe.getId()).document(document))
                    .get();
            log.info(
                "DELETE: Async indexed deleted recipe {} in Elasticsearch with result: {}",
                recipe.getTitle(),
                response.result());
          } catch (Exception e) {
            log.error(
                "Failed to async index deleted recipe {} in Elasticsearch: {}",
                recipeId,
                e.getMessage());
          }
        });
    return "Recipe deleted successfully!";
  }

  @Override
  public Page<RecipeResponse> getRecipes(
    Pageable pageable, String keyword, List<String> categoryIds) {

    if (keyword != null && keyword.trim().isEmpty()) {
      keyword = "";
    }

    if (categoryIds != null && categoryIds.isEmpty()) {
      categoryIds = null;
    }

    Page<Recipe> recipePage = recipeRepository.findAllWithFilters(pageable, keyword, categoryIds);
    return recipePage.map(recipeMapper::toRecipeResponse);
  }

  @Override
  public RecipeResponse getRecipeId(String id) {
    return recipeRepository
        .findById(id)
        .map(recipeMapper::toRecipeResponse)
        .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
  }

  @Override
  public RecipeResponse getRecipeName(String name) {
    return recipeRepository
        .findByTitle(name)
        .map(recipeMapper::toRecipeResponse)
        .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
  }

  @Override
  public List<RecipeResponse> getMyRecipes(String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    return recipeMapper.toRecipeResponseList(recipeRepository.findAllByAccountId(account.getId()));
  }

  private Recipe buildBaseRecipe(RecipeCreationRequest request, Account account) {
    return Recipe.builder()
        .title(request.getTitle())
        .cookingTime(request.getCookingTime())
        .difficulty(request.getDifficulty())
        .servings(request.getServings())
        .description(request.getDescription())
        .account(account)
        .isVerified(false)
        .isDeleted(false)
        .shareCount(0)
        .build();
  }

  private List<Category> resolveCategories(List<String> categoryIds) {
    log.info("- Resolving categories: {}", categoryIds);
    return categoryIds.stream()
        .map(
            categoryId -> {
              log.info("Fetching category by ID: {}", categoryId);
              return categoryRepository
                  .findById(categoryId)
                  .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
            })
        .collect(Collectors.toCollection(ArrayList::new));
  }

  //  private Set<Tag> resolveTags(List<TagCreationRequest> requests) {
  //    log.info("- Resolving tags: {}", requests);
  //    return requests.stream()
  //        .map(
  //            tagCreationRequest -> {
  //              log.info("Processing tag: {}", tagCreationRequest.getName());
  //              return tagRepository
  //                  .findByName(tagCreationRequest.getName())
  //                  .map(
  //                      existing -> {
  //                        if (!Objects.equals(existing.getColor(), tagCreationRequest.getColor()))
  // {
  //                          existing.setColor(tagCreationRequest.getColor());
  //                          log.info("Saving updated tag: {}", existing.getName());
  //                          tagRepository.save(existing);
  //                        }
  //                        return existing;
  //                      })
  //                  .orElseGet(
  //                      () -> {
  //                        Tag newTag =
  //                            Tag.builder()
  //                                .name(tagCreationRequest.getName())
  //                                .color(tagCreationRequest.getColor())
  //                                .build();
  //                        log.info("Saving new tag: {}", newTag.getName());
  //                        return tagRepository.save(newTag);
  //                      });
  //            })
  //        .collect(Collectors.toCollection(HashSet::new));
  //  }

  private List<Ingredient> buildIngredients(
      List<IngredientCreationRequest> requests, Recipe recipe) {
    log.info("Building ingredients for recipe: {}", recipe.getId());
    return requests.stream()
        .map(
            request -> {
              log.info("Fetching ingredient template: {}", request.getTemplateId());
              IngredientTemplate ingredientTemplate =
                  ingredientTemplateRepository
                      .findById(request.getTemplateId())
                      .orElseThrow(
                          () -> new AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED));

              log.info("Fetching ingredient unit: {}", request.getUnitId());
              IngredientUnit ingredientUnit =
                  ingredientUnitRepository
                      .findById(request.getUnitId())
                      .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED));

              return Ingredient.builder()
                  .recipe(recipe)
                  .template(ingredientTemplate)
                  .unit(ingredientUnit)
                  .quantity(request.getQuantity())
                  .note(request.getNote())
                  .orderIndex(request.getOrderIndex())
                  .build();
            })
        .collect(Collectors.toCollection(ArrayList::new));
  }

  private List<Instruction> buildInstructions(
      List<InstructionCreationRequest> instructionCreationRequests, Recipe recipe) {
    log.info("Building instructions for recipe: {}", recipe.getId());
    List<Instruction> instructions = new ArrayList<>();

    for (InstructionCreationRequest req : instructionCreationRequests) {
      log.info("Building instruction step: {}", req.getStepNumber());
      Instruction instruction =
          Instruction.builder()
              .recipe(recipe)
              .stepNumber(req.getStepNumber())
              .description(req.getDescription())
              .build();
      instruction = instructionRepository.save(instruction);

      if (req.getImages() != null) {
        log.info("Uploading images for instruction step: {}", req.getStepNumber());
        List<Image> images = uploadImages(req.getImages(), null, instruction);
        imageRepository.saveAll(images);
        instruction.setImages(new ArrayList<>(images));
      }

      instructions.add(instruction);
    }

    return instructions;
  }

  private List<Image> uploadImages(
      List<ImageRequest> requests, Recipe recipe, Instruction instruction) {
    log.info(
        "Uploading images for recipe: {}, instruction: {}",
        recipe != null ? recipe.getId() : null,
        instruction != null ? instruction.getStepNumber() : null);
    return requests.stream()
        .map(
            img -> {
              log.info("Uploading image with display order: {}", img.getDisplayOrder());
              String url = cloudinaryService.uploadImage(img.getFile());
              return Image.builder()
                  .url(url)
                  .displayOrder(img.getDisplayOrder())
                  .recipe(recipe)
                  .instruction(instruction)
                  .build();
            })
        .collect(Collectors.toCollection(ArrayList::new));
  }

  private RecipeDocument mapToDocument(Recipe recipe, Account account) {
    return RecipeDocument.builder()
        .id(recipe.getId())
        .title(recipe.getTitle())
        .cookingTime(recipe.getCookingTime())
        .difficulty(recipe.getDifficulty() != null ? recipe.getDifficulty().name() : null)
        .description(recipe.getDescription())
        .servings(recipe.getServings())
        .accountId(account.getId())
        .accountName(account.getUsername())
        .categoryIds(
            recipe.getCategories() != null
                ? new ArrayList<>(recipe.getCategories().stream().map(Category::getName).toList())
                : new ArrayList<>())
        .ingredients(
            recipe.getIngredients() != null
                ? new ArrayList<>(
                    recipe.getIngredients().stream()
                        .map(
                            ing ->
                                new RecipeDocument.Ingredient(
                                    ing.getTemplate().getName(), ing.getQuantity().toString()))
                        .toList())
                : new ArrayList<>())
        .instructions(
            recipe.getInstructions() != null
                ? new ArrayList<>(
                    recipe.getInstructions().stream()
                        .map(
                            ins ->
                                new RecipeDocument.Instruction(
                                    ins.getStepNumber(), ins.getDescription()))
                        .toList())
                : new ArrayList<>())
        .images(
            recipe.getImages() != null
                ? new ArrayList<>(
                    recipe.getImages().stream()
                        .map(img -> new RecipeDocument.Image(img.getUrl()))
                        .toList())
                : new ArrayList<>())
        .isDeleted(recipe.getIsDeleted())
        .createdAt(recipe.getCreatedDate().toString())
        .updatedAt(recipe.getLastModifiedDate().toString())
        .build();
  }
}
