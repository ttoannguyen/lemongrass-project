package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.*;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.RecipeMapper;
import com.ttoannguyen.lemongrass.repository.*;
import com.ttoannguyen.lemongrass.service.CloudinaryService;
import com.ttoannguyen.lemongrass.service.RecipeService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecipeServiceImpl implements RecipeService {

  RecipeRepository recipeRepository;
  IngredientTemplateRepository ingredientTemplateRepository;
  IngredientUnitRepository ingredientUnitRepository;
  InstructionRepository instructionRepository;
  IngredientRepository ingredientRepository;
  ImageRepository imageRepository;
  TagRepository tagRepository;
  RecipeMapper recipeMapper;
  CloudinaryService cloudinaryService;

  @Override
  @Transactional
  public RecipeResponse create(RecipeCreationRequest request) {
    // 1. Tạo Recipe cơ bản
    Recipe recipe =
        Recipe.builder()
            .title(request.getTitle())
            .cookingTime(request.getCookingTime())
            .difficulty(request.getDifficulty())
            .servings(request.getServings())
            .category(request.getCategory())
            .isVerified(false)
            .shareCount(0)
            .build();

    // 2. Gán Tags trước khi lưu recipe
    if (request.getTags() != null) {
      Set<Tag> tags =
          request.getTags().stream()
              .map(
                  tagReq ->
                      tagRepository
                          .findById(tagReq.getName())
                          .map(
                              existing -> {
                                if (!Objects.equals(existing.getColor(), tagReq.getColor())) {
                                  existing.setColor(tagReq.getColor());
                                }
                                return existing;
                              })
                          .orElseGet(
                              () ->
                                  tagRepository.save(
                                      Tag.builder()
                                          .name(tagReq.getName())
                                          .color(tagReq.getColor())
                                          .build())))
              .collect(Collectors.toSet());
      recipe.setTags(tags);
    }

    // 💾 Lưu Recipe ngay bây giờ
    recipe = recipeRepository.save(recipe);

    // 3. Gán Ingredients
    if (request.getIngredients() != null) {
      final Recipe finalRecipe = recipe;
      List<Ingredient> ingredients =
          request.getIngredients().stream()
              .map(
                  req -> {
                    IngredientTemplate template =
                        ingredientTemplateRepository
                            .findById(req.getTemplateId())
                            .orElseThrow(
                                () -> new AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED));
                    IngredientUnit unit =
                        ingredientUnitRepository
                            .findById(req.getUnitId())
                            .orElseThrow(
                                () -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED));
                    return Ingredient.builder()
                        .recipe(finalRecipe)
                        .template(template)
                        .unit(unit)
                        .quantity(req.getQuantity())
                        .note(req.getNote())
                        .orderIndex(req.getOrderIndex())
                        .build();
                  })
              .toList();
      ingredientRepository.saveAll(ingredients);
      recipe.setIngredients(ingredients);
    }

    // 4. Gán Instructions và ảnh instruction
    if (request.getInstructions() != null) {
      List<Instruction> instructions = new ArrayList<>();
      for (var instructionReq : request.getInstructions()) {
        Instruction instruction =
            Instruction.builder()
                .recipe(recipe)
                .stepNumber(instructionReq.getStepNumber())
                .description(instructionReq.getDescription())
                .build();

        instruction = instructionRepository.save(instruction); // ✅ phải lưu trước khi gán ảnh

        if (instructionReq.getImages() != null) {
          final Instruction finalInstruction = instruction;
          List<Image> instructionImages =
              instructionReq.getImages().stream()
                  .map(
                      img -> {
                        String url = cloudinaryService.uploadImage(img.getFile());
                        return Image.builder()
                            .url(url)
                            .displayOrder(img.getDisplayOrder())
                            .instruction(finalInstruction)
                            .build();
                      })
                  .toList();
          imageRepository.saveAll(instructionImages);
          instruction.setImages(instructionImages);
        }

        instructions.add(instruction);
      }
      recipe.setInstructions(instructions);
    }

    // 5. Gán ảnh chính cho Recipe
    if (request.getImages() != null) {
      final Recipe finalRecipe1 = recipe;
      List<Image> recipeImages =
          request.getImages().stream()
              .map(
                  img -> {
                    String url = cloudinaryService.uploadImage(img.getFile());
                    return Image.builder()
                        .url(url)
                        .displayOrder(img.getDisplayOrder())
                        .recipe(finalRecipe1)
                        .build();
                  })
              .toList();
      imageRepository.saveAll(recipeImages);
      recipe.setImages(recipeImages);
    }

    // 6. Trả về response
    return recipeMapper.toRecipeResponse(recipe);

    // 1. Khởi tạo Recipe cơ bản
    //    Recipe recipe =
    //        Recipe.builder()
    //            .title(request.getTitle())
    //            .cookingTime(request.getCookingTime())
    //            .difficulty(request.getDifficulty())
    //            .servings(request.getServings())
    //            .category(request.getCategory())
    //            .isVerified(false)
    //            .shareCount(0)
    //            .build();
    //
    //    // 2. Gán Tags
    //    if (request.getTags() != null) {
    //      Set<Tag> tags =
    //          request.getTags().stream()
    //              .map(
    //                  tagReq ->
    //                      tagRepository
    //                          .findById(tagReq.getName())
    //                          .map(
    //                              existing -> {
    //                                if (!Objects.equals(existing.getColor(), tagReq.getColor())) {
    //                                  existing.setColor(tagReq.getColor());
    //                                }
    //                                return existing;
    //                              })
    //                          .orElseGet(
    //                              () ->
    //                                  tagRepository.save(
    //                                      Tag.builder()
    //                                          .name(tagReq.getName())
    //                                          .color(tagReq.getColor())
    //                                          .build())))
    //              .collect(Collectors.toSet());
    //      recipe.setTags(tags);
    //    }
    //
    //    // 3. Gán Ingredients
    //    if (request.getIngredients() != null) {
    //      List<Ingredient> ingredients =
    //          request.getIngredients().stream()
    //              .map(
    //                  req -> {
    //                    IngredientTemplate template =
    //                        ingredientTemplateRepository
    //                            .findById(req.getTemplateId())
    //                            .orElseThrow(
    //                                () -> new
    // AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED));
    //                    IngredientUnit unit =
    //                        ingredientUnitRepository
    //                            .findById(req.getUnitId())
    //                            .orElseThrow(
    //                                () -> new
    // AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED));
    //                    return Ingredient.builder()
    //                        .recipe(recipe)
    //                        .template(template)
    //                        .unit(unit)
    //                        .quantity(req.getQuantity())
    //                        .note(req.getNote())
    //                        .orderIndex(req.getOrderIndex())
    //                        .build();
    //                  })
    //              .toList();
    //      recipe.setIngredients(ingredients);
    //    }
    //
    //    // 4. Gán Instructions và ảnh của từng instruction
    //    List<Instruction> instructions = new ArrayList<>();
    //    for (var instructionReq : request.getInstructions()) {
    //      Instruction instruction =
    //          Instruction.builder()
    //              .recipe(recipe)
    //              .stepNumber(instructionReq.getStepNumber())
    //              .description(instructionReq.getDescription())
    //              .build();
    //
    //      instruction = instructionRepository.save(instruction); // ✅ Lưu trước để có ID
    //
    //      if (instructionReq.getImages() != null) {
    //        Instruction finalInstruction = instruction;
    //        List<Image> instructionImages =
    //            instructionReq.getImages().stream()
    //                .map(
    //                    img -> {
    //                      String url = cloudinaryService.uploadImage(img.getFile());
    //                      return Image.builder()
    //                          .url(url)
    //                          .displayOrder(img.getDisplayOrder())
    //                          .instruction(finalInstruction)
    //                          .build();
    //                    })
    //                .toList();
    //        imageRepository.saveAll(instructionImages); // ✅ Lưu ảnh
    //        instruction.setImages(instructionImages); // Gán lại ảnh
    //      }
    //
    //      instructions.add(instruction);
    //    }
    //    recipe.setInstructions(instructions);
    //
    //    // 5. Gán ảnh chính cho Recipe
    //    if (request.getImages() != null) {
    //      List<Image> recipeImages =
    //          request.getImages().stream()
    //              .map(
    //                  img -> {
    //                    String url = cloudinaryService.uploadImage(img.getFile());
    //                    return Image.builder()
    //                        .url(url)
    //                        .displayOrder(img.getDisplayOrder())
    //                        .recipe(recipe)
    //                        .build();
    //                  })
    //              .toList();
    //      recipe.setImages(recipeImages);
    //    }
    //
    //    // 6. Lưu recipe
    //    Recipe savedRecipe = recipeRepository.save(recipe);
    //
    //    // 7. Trả về RecipeResponse có chứa ảnh
    //    return recipeMapper.toRecipeResponse(savedRecipe);
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
}
