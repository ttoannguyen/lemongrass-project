package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;

import java.util.List;

public interface RecommendationService {
  List<RecipeResponse> recommendRecipes(String username, int topN);
}
