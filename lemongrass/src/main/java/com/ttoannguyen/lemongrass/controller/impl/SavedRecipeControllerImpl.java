package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.SavedController;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.SavedRecipeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavedRecipeControllerImpl implements SavedController {
  SavedRecipeService savedRecipeService;

  @Override
  public ApiResponse<Void> saveRecipe(String recipeId) {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<Void>builder()
        .message(String.valueOf(savedRecipeService.saveRecipe(username, recipeId)))
        .build();
  }

  @Override
  public ApiResponse<List<RecipeResponse>> getSavedRecipes() {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<List<RecipeResponse>>builder()
        .result(savedRecipeService.getSavedRecipes(username))
        .build();
  }

  @Override
  public ApiResponse<Void> unSaveRecipe(String recipeId) {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    log.info(username);
    return ApiResponse.<Void>builder()
        .message(String.valueOf(savedRecipeService.unSaveRecipe(username, recipeId)))
        .build();
  }
}
