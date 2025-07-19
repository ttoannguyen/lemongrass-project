package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.category.CategoryCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.instruction.InstructionCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.tag.TagCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.*;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import com.ttoannguyen.lemongrass.mapper.RecipeMapper;
import com.ttoannguyen.lemongrass.repository.*;
import com.ttoannguyen.lemongrass.service.CloudinaryService;
import com.ttoannguyen.lemongrass.service.RecipeService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecipeServiceImpl implements RecipeService {

  RecipeMapper recipeMapper;
  AccountMapper accountMapper;

  TagRepository tagRepository;
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

    if (request.getTags() != null) {
      Set<Tag> tags = resolveTags(request.getTags());
      recipe.setTags(tags);
    }

    if (request.getCategoryIds() != null) {
      List<Category> categories = resolveCategories(request.getCategoryIds());
      recipe.setCategories(categories);
      // Đồng bộ phía Category
      categories.forEach(category -> category.getRecipes().add(recipe));
    }

    if (request.getIngredients() != null) {
      List<Ingredient> ingredients = buildIngredients(request.getIngredients(), recipe);
      ingredientRepository.saveAll(ingredients);
      recipe.setIngredients(ingredients);
    }

    if (request.getInstructions() != null) {
      List<Instruction> instructions = buildInstructions(request.getInstructions(), recipe);
      instructionRepository.saveAll(instructions);
      recipe.setInstructions(instructions);
    }

    if (request.getImages() != null) {
      List<Image> images = uploadImages(request.getImages(), recipe, null);
      imageRepository.saveAll(images);
      recipe.setImages(images);
    }
    return recipeMapper.toRecipeResponse(recipe);
  }

  @Override
  public List<RecipeResponse> getRecipes() {
    List<Recipe> recipes = recipeRepository.findAll();
    return recipeMapper.toRecipeResponseList(recipes);
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
        .account(account)
        .isVerified(false)
        .shareCount(0)
        .build();
  }

  private List<Category> resolveCategories(List<String> categoryIds) {
    return categoryIds.stream()
        .map(
            categoryId ->
                categoryRepository
                    .findById(categoryId)
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)))
        .toList();
  }

  //  private List<Category> resolveCategories(List<String> categoryIds) {
  //
  //    return categoryIds.stream()
  //        .map(
  //            categoryCreationRequest ->
  //                categoryRepository
  //                    .findById(categoryCreationRequest)
  //                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)))
  //        .toList();
  //  }

  private Set<Tag> resolveTags(List<TagCreationRequest> requests) {
    return requests.stream()
        .map(
            tagCreationRequest ->
                tagRepository
                    .findByName(tagCreationRequest.getName())
                    .map(
                        existing -> {
                          if (!Objects.equals(existing.getColor(), tagCreationRequest.getColor()))
                            existing.setColor(tagCreationRequest.getColor());

                          return existing;
                        })
                    .orElseGet(
                        () ->
                            tagRepository.save(
                                Tag.builder()
                                    .name(tagCreationRequest.getName())
                                    .color(tagCreationRequest.getColor())
                                    .build())))
        .collect(Collectors.toSet());
  }

  private List<Ingredient> buildIngredients(
      List<IngredientCreationRequest> requests, Recipe recipe) {
    return requests.stream()
        .map(
            request -> {
              IngredientTemplate ingredientTemplate =
                  ingredientTemplateRepository
                      .findById(request.getTemplateId())
                      .orElseThrow(
                          () -> new AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED));

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
        .toList();
  }

  private List<Instruction> buildInstructions(
      List<InstructionCreationRequest> instructionCreationRequests, Recipe recipe) {
    List<Instruction> instructions = new ArrayList<>();

    for (InstructionCreationRequest req : instructionCreationRequests) {
      Instruction instruction =
          Instruction.builder()
              .recipe(recipe)
              .stepNumber(req.getStepNumber())
              .description(req.getDescription())
              .build();
      instruction = instructionRepository.save(instruction);

      if (req.getImages() != null) {
        List<Image> images = uploadImages(req.getImages(), null, instruction);
        imageRepository.saveAll(images);
        instruction.setImages(images);
      }

      instructions.add(instruction);
    }

    return instructions;
  }

  private List<Image> uploadImages(
      List<ImageRequest> requests, Recipe recipe, Instruction instruction) {
    return requests.stream()
        .map(
            img -> {
              String url = cloudinaryService.uploadImage(img.getFile());
              return Image.builder()
                  .url(url)
                  .displayOrder(img.getDisplayOrder())
                  .recipe(recipe)
                  .instruction(instruction)
                  .build();
            })
        .collect(Collectors.toList());
  }
}
