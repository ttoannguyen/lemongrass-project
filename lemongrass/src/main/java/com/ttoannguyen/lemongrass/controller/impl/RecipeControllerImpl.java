package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.RecipeController;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.service.RecipeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecipeControllerImpl implements RecipeController {
  RecipeService recipeService;

  @Override
  public ApiResponse<RecipeResponse> create(RecipeCreationRequest request) {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<RecipeResponse>builder()
        .result(recipeService.create(request, username))
        .build();
  }

  @Override
  public ApiResponse<List<RecipeResponse>> getRecipes() {
    return ApiResponse.<List<RecipeResponse>>builder().result(recipeService.getRecipes()).build();
  }

  @Override
  public ApiResponse<RecipeResponse> getRecipeById(String id) {
    return ApiResponse.<RecipeResponse>builder().result(recipeService.getRecipeId(id)).build();
  }

  @Override
  public ApiResponse<List<RecipeResponse>> getMyRecipes() {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<List<RecipeResponse>>builder()
        .result(recipeService.getMyRecipes(username))
        .build();
  }
}
