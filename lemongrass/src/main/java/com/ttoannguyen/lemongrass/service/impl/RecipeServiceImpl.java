package com.ttoannguyen.lemongrass.service.impl;

import co.elastic.clients.elasticsearch.ElasticsearchAsyncClient;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.dto.Request.image.ImageUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Request.instruction.InstructionCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.instruction.InstructionUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeGetUpdateResponse;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.*;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.RecipeMapper;
import com.ttoannguyen.lemongrass.repository.*;
import com.ttoannguyen.lemongrass.search.document.RecipeDocument;
import com.ttoannguyen.lemongrass.search.service.embedding.EmbeddingService;
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
  RatingRepository ratingRepository;
  EmbeddingService embeddingService;

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

    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Recipe recipe =
        recipeRepository
            .findById(request.getId())
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));

    if (!recipe.getAccount().getId().equals(account.getId())) {
      throw new AppException(ErrorCode.UNAUTHORIZED);
    }

    // Cập nhật thông tin cơ bản
    updateBasicInfo(recipe, request);

    // Cập nhật categories
    updateCategories(recipe, request.getCategoryIds());

    // Cập nhật ingredients
    updateIngredients(recipe, request.getIngredients());

    // Cập nhật instructions + ảnh trong instruction
    updateInstructions(recipe, request.getInstructions());

    // Cập nhật ảnh của recipe
    updateRecipeImages(recipe, request.getImages());

    recipeRepository.save(recipe);

    // Index lại Elasticsearch
    indexRecipeAsync(recipe, account);

    return recipeMapper.toRecipeResponse(recipe);
  }

  //  @Override
  //  @Transactional
  //  public RecipeResponse update(RecipeUpdateRequest request, String username) {
  //    log.info("Starting recipe update for ID: {}, username: {}", request.getId(), username);
  //
  //    log.info("Fetching account for username: {}", username);
  //    Account account =
  //        accountRepository
  //            .findByUsername(username)
  //            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
  //
  //    Recipe recipe =
  //        recipeRepository
  //            .findById(request.getId())
  //            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
  //    if (!recipe.getAccount().getId().equals(account.getId())) {
  //      log.error("User {} not authorized to update recipe {}", username, request.getId());
  //      throw new AppException(ErrorCode.UNAUTHORIZED);
  //    }
  //    recipe.setTitle(request.getTitle());
  //    recipe.setCookingTime(request.getCookingTime());
  //    recipe.setDifficulty(request.getDifficulty());
  //    recipe.setDescription(request.getDescription());
  //    recipe.setServings(request.getServings());
  //    recipeRepository.save(recipe);
  //
  //    //    if (request.getTags() != null) {
  //    //      recipe.getTags().clear();
  //    //      Set<Tag> tags = resolveTags(request.getTags());
  //    //      recipe.setTags(new HashSet<>(tags));
  //    //      log.info("Tags updated, type: {}", recipe.getTags().getClass().getName());
  //    //    }
  //
  //    if (request.getCategoryIds() != null) {
  //      recipe
  //          .getCategories()
  //          .forEach(
  //              category -> {
  //                log.info("Removing recipe {} from category {}", recipe.getId(),
  // category.getId());
  //                if (category.getRecipes() != null) {
  //                  category.getRecipes().remove(recipe);
  //                }
  //              });
  //      categoryRepository.saveAll(recipe.getCategories());
  //      recipe.getCategories().clear();
  //      log.info("Resolving new categories: {}", request.getCategoryIds());
  //      List<Category> categories = resolveCategories(request.getCategoryIds());
  //      recipe.setCategories(new ArrayList<>(categories));
  //      categories.forEach(
  //          category -> {
  //            if (category.getRecipes() == null) {
  //              category.setRecipes(new ArrayList<>());
  //            }
  //            category.getRecipes().add(recipe);
  //          });
  //      categoryRepository.saveAll(categories);
  //    }
  //
  //    if (request.getIngredients() != null) {
  //      Map<String, Ingredient> existingMap =
  //          recipe.getIngredients().stream().collect(Collectors.toMap(Ingredient::getId, ing ->
  // ing));
  //
  //      List<Ingredient> updatedList = new ArrayList<>();
  //      for (IngredientUpdateRequest reqIng : request.getIngredients()) {
  //        if (reqIng.getId() != null && existingMap.containsKey(reqIng.getId())) {
  //          // Update ingredient cũ
  //          Ingredient ing = existingMap.get(reqIng.getId());
  //          ing.setQuantity(reqIng.getQuantity());
  //          ing.setNote(reqIng.getNote());
  //          ing.setOrderIndex(reqIng.getOrderIndex());
  //          ing.setTemplate(
  //              ingredientTemplateRepository
  //                  .findById(reqIng.getTemplateId())
  //                  .orElseThrow(() -> new
  // AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED)));
  //          ing.setUnit(
  //              ingredientUnitRepository
  //                  .findById(reqIng.getUnitId())
  //                  .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED)));
  //          updatedList.add(ing);
  //        } else {
  //          // Thêm mới
  //          Ingredient newIng =
  //              Ingredient.builder()
  //                  .recipe(recipe)
  //                  .template(
  //                      ingredientTemplateRepository
  //                          .findById(reqIng.getTemplateId())
  //                          .orElseThrow(
  //                              () -> new
  // AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED)))
  //                  .unit(
  //                      ingredientUnitRepository
  //                          .findById(reqIng.getUnitId())
  //                          .orElseThrow(
  //                              () -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED)))
  //                  .quantity(reqIng.getQuantity())
  //                  .note(reqIng.getNote())
  //                  .orderIndex(reqIng.getOrderIndex())
  //                  .build();
  //          updatedList.add(newIng);
  //        }
  //      }
  //
  //      Set<String> requestIds =
  //          request.getIngredients().stream()
  //              .map(IngredientUpdateRequest::getId)
  //              .filter(Objects::nonNull)
  //              .collect(Collectors.toSet());
  //
  //      List<Ingredient> toRemove =
  //          recipe.getIngredients().stream()
  //              .filter(ing -> !requestIds.contains(ing.getId()))
  //              .toList();
  //      ingredientRepository.deleteAll(toRemove);
  //
  //      recipe.setIngredients(updatedList);
  //      ingredientRepository.saveAll(updatedList);
  //
  //      //      ingredientRepository.deleteAll(recipe.getIngredients());
  //      //      recipe.getIngredients().clear();
  //      //      List<Ingredient> ingredients = buildIngredients(request.getIngredients(), recipe);
  //      //      ingredientRepository.saveAll(ingredients);
  //      //      recipe.setIngredients(new ArrayList<>(ingredients));
  //    }
  //
  //    if (request.getInstructions() != null) {
  //      // 1. Lấy tất cả instruction hiện có trong DB thành Map để tra cứu nhanh theo ID
  //      Map<String, Instruction> existingMap =
  //          recipe.getInstructions().stream()
  //              .collect(Collectors.toMap(Instruction::getId, ins -> ins));
  //
  //      // 2. Tạo danh sách mới để chứa instruction đã update hoặc thêm mới
  //      List<Instruction> updatedList = new ArrayList<>();
  //
  //      // 3. Duyệt qua danh sách instruction từ request
  //      for (InstructionUpdateRequest reqIns : request.getInstructions()) {
  //        if (reqIns.getId() != null && existingMap.containsKey(reqIns.getId())) {
  //          // 4. Nếu có ID và tồn tại trong DB → Update dữ liệu cũ
  //          Instruction ins = existingMap.get(reqIns.getId());
  //          ins.setStepNumber(reqIns.getStepNumber());
  //          ins.setDescription(reqIns.getDescription());
  //
  //          // 5. Xử lý ảnh trong instruction
  //          if (reqIns.getImages() != null) {
  //            Map<String, Image> existingImages =
  //                ins.getImages().stream().collect(Collectors.toMap(Image::getId, img -> img));
  //
  //            List<Image> updatedImages = new ArrayList<>();
  //
  //            for (ImageUpdateRequest imgReq : reqIns.getImages()) {
  //              if (imgReq.getId() != null && existingImages.containsKey(imgReq.getId())) {
  //                // 6. Update ảnh cũ
  //                Image img = existingImages.get(imgReq.getId());
  //                img.setDisplayOrder(imgReq.getDisplayOrder());
  //                updatedImages.add(img);
  //              } else {
  //                // 7. Thêm ảnh mới
  //                String url = cloudinaryService.uploadImage(imgReq.getFile());
  //                Image newImg =
  //                    Image.builder()
  //                        .url(url)
  //                        .displayOrder(imgReq.getDisplayOrder())
  //                        .instruction(ins)
  //                        .build();
  //                updatedImages.add(newImg);
  //              }
  //            }
  //
  //            // 8. Xóa ảnh không còn trong request
  //            Set<String> reqImageIds =
  //                reqIns.getImages().stream()
  //                    .map(ImageUpdateRequest::getId)
  //                    .filter(Objects::nonNull)
  //                    .collect(Collectors.toSet());
  //            List<Image> toRemove =
  //                ins.getImages().stream().filter(img ->
  // !reqImageIds.contains(img.getId())).toList();
  //            imageRepository.deleteAll(toRemove);
  //
  //            ins.setImages(updatedImages);
  //          }
  //
  //          updatedList.add(ins);
  //
  //        } else {
  //          // 9. Nếu không có ID → Thêm instruction mới
  //          Instruction newIns =
  //              Instruction.builder()
  //                  .recipe(recipe)
  //                  .stepNumber(reqIns.getStepNumber())
  //                  .description(reqIns.getDescription())
  //                  .build();
  //          newIns = instructionRepository.save(newIns);
  //
  //          // 10. Thêm ảnh cho instruction mới
  //          if (reqIns.getImages() != null) {
  //            Instruction finalNewIns = newIns;
  //            List<Image> newImages =
  //                reqIns.getImages().stream()
  //                    .map(
  //                        imgReq -> {
  //                          String url = cloudinaryService.uploadImage(imgReq.getFile());
  //                          return Image.builder()
  //                              .url(url)
  //                              .displayOrder(imgReq.getDisplayOrder())
  //                              .instruction(finalNewIns)
  //                              .build();
  //                        })
  //                    .toList();
  //            imageRepository.saveAll(newImages);
  //            newIns.setImages(new ArrayList<>(newImages));
  //          }
  //
  //          updatedList.add(newIns);
  //        }
  //      }
  //
  //      // 11. Xóa instruction nào không còn trong request
  //      Set<String> requestIds =
  //          request.getInstructions().stream()
  //              .map(InstructionUpdateRequest::getId)
  //              .filter(Objects::nonNull)
  //              .collect(Collectors.toSet());
  //      List<Instruction> toRemove =
  //          recipe.getInstructions().stream()
  //              .filter(ins -> !requestIds.contains(ins.getId()))
  //              .toList();
  //      instructionRepository.deleteAll(toRemove);
  //
  //      // 12. Gán danh sách mới vào recipe và lưu
  //      recipe.setInstructions(updatedList);
  //      instructionRepository.saveAll(updatedList);
  //    }
  //
  //    //    if (request.getInstructions() != null) {
  //    //      instructionRepository.deleteAll(recipe.getInstructions());
  //    //      recipe.getInstructions().clear();
  //    //      List<Instruction> instructions = buildInstructions(request.getInstructions(),
  // recipe);
  //    //      instructionRepository.saveAll(instructions);
  //    //      recipe.setInstructions(new ArrayList<>(instructions));
  //    //    }
  //
  //    //    if (request.getImages() != null) {
  //    //      imageRepository.deleteAll(recipe.getImages());
  //    //      recipe.getImages().clear();
  //    //      List<Image> images = uploadImages(request.getImages(), recipe, null);
  //    //      imageRepository.saveAll(images);
  //    //      recipe.setImages(new ArrayList<>(images));
  //    //    }
  //
  //    if (request.getImages() != null) {
  //      // Map ảnh hiện có để tra nhanh
  //      Map<String, Image> existingImages =
  //          recipe.getImages().stream()
  //              .filter(img -> img.getId() != null)
  //              .collect(Collectors.toMap(Image::getId, img -> img));
  //
  //      List<Image> updatedImages = new ArrayList<>();
  //
  //      for (ImageUpdateRequest imgReq : request.getImages()) {
  //        if (imgReq.getId() != null && existingImages.containsKey(imgReq.getId())) {
  //          // Ảnh cũ → update displayOrder, giữ nguyên URL
  //          Image img = existingImages.get(imgReq.getId());
  //          img.setDisplayOrder(imgReq.getDisplayOrder());
  //          updatedImages.add(img);
  //
  //        } else if (imgReq.getFile() != null) {
  //          // Ảnh mới có file → upload Cloudinary
  //          String url = cloudinaryService.uploadImage(imgReq.getFile());
  //          Image newImg =
  //              Image.builder()
  //                  .url(url)
  //                  .displayOrder(imgReq.getDisplayOrder())
  //                  .recipe(recipe)
  //                  .build();
  //          updatedImages.add(newImg);
  //
  //        } else if (imgReq.getPreviewUrl() != null) {
  //          // Ảnh mới nhưng chỉ có previewUrl → giữ nguyên URL đó
  //          Image newImg =
  //              Image.builder()
  //                  .url(imgReq.getPreviewUrl())
  //                  .displayOrder(imgReq.getDisplayOrder())
  //                  .recipe(recipe)
  //                  .build();
  //          updatedImages.add(newImg);
  //        }
  //      }
  //
  //      // Xóa ảnh không còn trong request
  //      Set<String> reqIds =
  //          request.getImages().stream()
  //              .map(ImageUpdateRequest::getId)
  //              .filter(Objects::nonNull)
  //              .collect(Collectors.toSet());
  //
  //      List<Image> toRemove =
  //          recipe.getImages().stream()
  //              .filter(img -> img.getId() != null && !reqIds.contains(img.getId()))
  //              .toList();
  //
  //      imageRepository.deleteAll(toRemove);
  //
  //      // Lưu lại danh sách ảnh mới
  //      recipe.setImages(updatedImages);
  //      imageRepository.saveAll(updatedImages);
  //    }
  //
  //    log.info("Converting recipe to document for Elasticsearch");
  //    RecipeDocument document;
  //    try {
  //      document = mapToDocument(recipe, account);
  //      log.info("RecipeDocument (update) created: {}", document.getId());
  //    } catch (Exception e) {
  //      log.error(
  //          "Failed to create RecipeDocument for recipe {}: {}", recipe.getId(), e.getMessage(),
  // e);
  //      throw new AppException(ErrorCode.RECIPE_DOCUMENT_CREATION_FAILED);
  //    }
  //
  //    log.info("- Starting async (update) indexing for recipe: {}", recipe.getId());
  //    CompletableFuture.runAsync(
  //        () -> {
  //          try {
  //            IndexResponse response =
  //                elasticsearchAsyncClient
  //                    .index(i -> i.index("recipes").id(recipe.getId()).document(document))
  //                    .get();
  //            log.info(
  //                "Async indexed recipe {} in Elasticsearch with result: {}",
  //                recipe.getId(),
  //                response.result());
  //          } catch (Exception e) {
  //            log.error(
  //                "Failed to async index recipe {} in Elasticsearch: {}",
  //                recipe.getId(),
  //                e.getMessage());
  //          }
  //        });
  //
  //    log.info("Returning recipe updated response");
  //    return recipeMapper.toRecipeResponse(recipe);
  //  }

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
  public String unableRecipe(String recipeId, String username) {
    //    Account account =
    //        accountRepository
    //            .findByUsername(username)
    //            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    Recipe recipe =
        recipeRepository
            .findById(recipeId)
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));

    recipe.setVerified(false);
    recipeRepository.save(recipe);
    return "Recipe " + recipeId + " has been disabled successfully.";
  }

  @Override
  public String enableRecipe(String recipeId, String username) {
    Recipe recipe =
        recipeRepository
            .findById(recipeId)
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
    recipe.setVerified(true);
    recipeRepository.save(recipe);
    return "Recipe " + recipeId + " has been enasabled successfully.";
  }

  @Override
  public Page<RecipeResponse> getRecipes(
      Pageable pageable, String keyword, List<String> categoryIds, Integer maxTime) {

    if (keyword != null && keyword.trim().isEmpty()) {
      keyword = "";
    }

    if (categoryIds != null && categoryIds.isEmpty()) {
      categoryIds = null;
    }

    Page<Recipe> recipePage =
        recipeRepository.findAllWithFilters(pageable, keyword, categoryIds, maxTime);
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
  public RecipeGetUpdateResponse getUpdateRecipeId(String id) {
    return recipeRepository
        .findById(id)
        .map(recipeMapper::toRecipeGetUpdateResponse)
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

  @Override
  public List<RecipeResponse> getAccountRecipe(String id) {
    return recipeMapper.toRecipeResponseList(recipeRepository.findAllByAccountId(id));
  }

  @Override
  @Transactional
  public void rateRecipe(String recipeId, Double rating, String username) {
    if (rating < 0 || rating > 10) {
      throw new AppException(ErrorCode.INVALID_RATING);
    }

    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Recipe recipe =
        recipeRepository
            .findById(recipeId)
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
    Optional<Rating> existingRating =
        ratingRepository.findByRecipeIdAndAccountId(recipeId, account.getId());

    Rating ratingEntity;
    if (existingRating.isPresent()) {
      ratingEntity = existingRating.get();
      ratingEntity.setRating(rating);
    } else {
      ratingEntity = Rating.builder().recipe(recipe).account(account).rating(rating).build();
    }

    ratingRepository.save(ratingEntity);

    updateRecipeRating(recipe);

    recipeRepository.save(recipe);

    indexRecipeAsync(recipe, account);
  }

  private void updateRecipeRating(Recipe recipe) {
    double avgRating = ratingRepository.findAverageRatingByRecipeId(recipe.getId()).orElse(0.0);
    int ratingCount = ratingRepository.findCountByRecipeId(recipe.getId()).orElse(0L).intValue();

    recipe.setRatingAvg(avgRating);
    recipe.setRatingCount(ratingCount);
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
        .likeCount(0)
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

  private RecipeDocument mapToDocument(Recipe recipe, Account account)
      throws JsonProcessingException {
    return RecipeDocument.builder()
        .id(recipe.getId())
        .title(recipe.getTitle())
        .cookingTime(recipe.getCookingTime())
        .difficulty(recipe.getDifficulty() != null ? recipe.getDifficulty().name() : null)
        .description(recipe.getDescription())
        .servings(recipe.getServings())
        .accountId(account.getId())
        .accountName(account.getUsername())
        .titleVector(embeddingService.embedOne(recipe.getTitle()))
        .descriptionVector(embeddingService.embedOne(recipe.getDescription()))
        .ingredientsVector(
            embeddingService.embedOne(
                recipe.getIngredients().stream()
                    .map(i -> i.getTemplate().getName())
                    .collect(Collectors.joining(", "))))
        .categoryIds(
            recipe.getCategories() != null
                ? (recipe.getCategories().stream().map(Category::getName).toList())
                : List.of())
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
        .ratingAvg(recipe.getRatingAvg() != null ? recipe.getRatingAvg() : 0.0)
        .ratingCount(recipe.getRatingCount() != null ? recipe.getRatingCount() : 0)
        .isDeleted(recipe.getIsDeleted())
        .createdAt(recipe.getCreatedDate().toString())
        .updatedAt(recipe.getLastModifiedDate().toString())
        .build();
  }

  private void updateBasicInfo(Recipe recipe, RecipeUpdateRequest request) {
    recipe.setTitle(request.getTitle());
    recipe.setCookingTime(request.getCookingTime());
    recipe.setDifficulty(request.getDifficulty());
    recipe.setDescription(request.getDescription());
    recipe.setServings(request.getServings());
  }

  private void updateCategories(Recipe recipe, List<String> categoryIds) {
    if (categoryIds == null) return;

    // Xoá khỏi categories cũ
    recipe
        .getCategories()
        .forEach(
            cat -> {
              if (cat.getRecipes() != null) cat.getRecipes().remove(recipe);
            });
    categoryRepository.saveAll(recipe.getCategories());
    recipe.getCategories().clear();

    // Thêm categories mới
    List<Category> newCats = resolveCategories(categoryIds);
    newCats.forEach(
        cat -> {
          if (cat.getRecipes() == null) cat.setRecipes(new ArrayList<>());
          cat.getRecipes().add(recipe);
        });
    recipe.setCategories(newCats);
    categoryRepository.saveAll(newCats);
  }

  private void updateIngredients(Recipe recipe, List<IngredientUpdateRequest> ingredientRequests) {
    if (ingredientRequests == null) return;

    Map<String, Ingredient> existingMap =
        recipe.getIngredients().stream().collect(Collectors.toMap(Ingredient::getId, ing -> ing));

    List<Ingredient> updatedList = new ArrayList<>();

    for (IngredientUpdateRequest req : ingredientRequests) {
      Ingredient ing;
      if (req.getId() != null && existingMap.containsKey(req.getId())) {
        ing = existingMap.get(req.getId());
        ing.setQuantity(req.getQuantity());
        ing.setNote(req.getNote());
        ing.setOrderIndex(req.getOrderIndex());
        ing.setTemplate(
            ingredientTemplateRepository
                .findById(req.getTemplateId())
                .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED)));
        ing.setUnit(
            ingredientUnitRepository
                .findById(req.getUnitId())
                .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED)));
      } else {
        ing =
            Ingredient.builder()
                .recipe(recipe)
                .template(
                    ingredientTemplateRepository
                        .findById(req.getTemplateId())
                        .orElseThrow(
                            () -> new AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED)))
                .unit(
                    ingredientUnitRepository
                        .findById(req.getUnitId())
                        .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED)))
                .quantity(req.getQuantity())
                .note(req.getNote())
                .orderIndex(req.getOrderIndex())
                .build();
      }
      updatedList.add(ing);
    }

    // Xoá ingredient không còn
    Set<String> reqIds =
        ingredientRequests.stream()
            .map(IngredientUpdateRequest::getId)
            .filter(Objects::nonNull)
            .collect(Collectors.toSet());
    ingredientRepository.deleteAll(
        recipe.getIngredients().stream().filter(ing -> !reqIds.contains(ing.getId())).toList());

    //    recipe.setIngredients(updatedList);
    recipe.getIngredients().clear();
    recipe.getIngredients().addAll(updatedList);
    ingredientRepository.saveAll(updatedList);
  }

  private void updateInstructions(
      Recipe recipe, List<InstructionUpdateRequest> instructionRequests) {
    if (instructionRequests == null) return;

    Map<String, Instruction> existingMap =
        recipe.getInstructions().stream().collect(Collectors.toMap(Instruction::getId, ins -> ins));

    List<Instruction> updatedInstructions = new ArrayList<>();

    for (InstructionUpdateRequest req : instructionRequests) {
      Instruction ins;
      if (req.getId() != null && existingMap.containsKey(req.getId())) {
        ins = existingMap.get(req.getId());
        ins.setStepNumber(req.getStepNumber());
        ins.setDescription(req.getDescription());
      } else {
        ins =
            instructionRepository.save(
                Instruction.builder()
                    .recipe(recipe)
                    .stepNumber(req.getStepNumber())
                    .description(req.getDescription())
                    .build());
      }

      if (req.getImages() != null) {
        List<Image> updatedImages =
            processImageUpdates(req.getImages(), ins.getImages(), null, ins);
        ins.getImages().clear();
        ins.getImages().addAll(updatedImages);
      }

      updatedInstructions.add(ins);
    }

    // Xoá instruction không còn
    Set<String> reqIds =
        instructionRequests.stream()
            .map(InstructionUpdateRequest::getId)
            .filter(Objects::nonNull)
            .collect(Collectors.toSet());
    instructionRepository.deleteAll(
        recipe.getInstructions().stream().filter(ins -> !reqIds.contains(ins.getId())).toList());

    recipe.getInstructions().clear();
    recipe.getInstructions().addAll(updatedInstructions);
  }

  private void updateRecipeImages(Recipe recipe, List<ImageUpdateRequest> imageRequests) {
    if (imageRequests == null) return;
    List<Image> updated = processImageUpdates(imageRequests, recipe.getImages(), recipe, null);
    //    recipe.setImages(updated);
    recipe.getImages().clear();
    recipe.getImages().addAll(updated);
    imageRepository.saveAll(updated);
  }

  private List<Image> processImageUpdates(
      List<ImageUpdateRequest> imageRequests,
      List<Image> existingImages,
      Recipe recipe,
      Instruction instruction) {
    Map<String, Image> existingMap =
        existingImages.stream()
            .filter(img -> img.getId() != null)
            .collect(Collectors.toMap(Image::getId, img -> img));

    List<Image> updatedImages = new ArrayList<>();

    for (ImageUpdateRequest imgReq : imageRequests) {
      if (imgReq.getId() != null && existingMap.containsKey(imgReq.getId())) {
        Image img = existingMap.get(imgReq.getId());
        img.setDisplayOrder(imgReq.getDisplayOrder());
        updatedImages.add(img);
      } else if (imgReq.getFile() != null) {
        String url = cloudinaryService.uploadImage(imgReq.getFile());
        updatedImages.add(
            Image.builder()
                .url(url)
                .displayOrder(imgReq.getDisplayOrder())
                .recipe(recipe)
                .instruction(instruction)
                .build());
      } else if (imgReq.getPreviewUrl() != null) {
        updatedImages.add(
            Image.builder()
                .url(imgReq.getPreviewUrl())
                .displayOrder(imgReq.getDisplayOrder())
                .recipe(recipe)
                .instruction(instruction)
                .build());
      }
    }

    // Xoá ảnh không còn
    Set<String> reqIds =
        imageRequests.stream()
            .map(ImageUpdateRequest::getId)
            .filter(Objects::nonNull)
            .collect(Collectors.toSet());
    imageRepository.deleteAll(
        existingImages.stream()
            .filter(img -> img.getId() != null && !reqIds.contains(img.getId()))
            .toList());

    return updatedImages;
  }

  private void indexRecipeAsync(Recipe recipe, Account account) {
    try {
      RecipeDocument document = mapToDocument(recipe, account);
      CompletableFuture.runAsync(
          () -> {
            try {
              IndexResponse response =
                  elasticsearchAsyncClient
                      .index(i -> i.index("recipes").id(recipe.getId()).document(document))
                      .get();
              log.info("Indexed recipe {} in Elasticsearch: {}", recipe.getId(), response.result());
            } catch (Exception e) {
              log.error("Failed to index recipe {}: {}", recipe.getId(), e.getMessage());
            }
          });
    } catch (Exception e) {
      throw new AppException(ErrorCode.RECIPE_DOCUMENT_CREATION_FAILED);
    }
  }
}
