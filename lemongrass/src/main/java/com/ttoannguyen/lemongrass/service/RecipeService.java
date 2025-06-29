package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;

import java.util.List;

public interface RecipeService {
  RecipeResponse create(RecipeCreationRequest recipe, String username);

  List<RecipeResponse> getRecipes();

  RecipeResponse getRecipeId(String id);

  RecipeResponse getRecipeName(String name);
}
