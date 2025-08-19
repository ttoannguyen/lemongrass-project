package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.RecommendationController;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.repository.RecipeRepository;
import com.ttoannguyen.lemongrass.service.RecommendationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecommendationControllerImpl implements RecommendationController {
  RecommendationService recommendationService;
  RecipeRepository recipeRepository;

  @Override
  public ApiResponse<List<RecipeResponse>> getRecommendedRecipes(String username, int topN) {
    if (topN <= 0) topN = 3;

    List<RecipeResponse> recommendedRecipes =
        recommendationService.recommendRecipes(username, topN);

    if (recommendedRecipes.isEmpty()) {
      return ApiResponse.<List<RecipeResponse>>builder().build();
    }

    return ApiResponse.<List<RecipeResponse>>builder().result(recommendedRecipes).build();
  }
}
