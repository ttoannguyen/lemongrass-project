package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;

import java.util.List;

public interface RecipeService {
  RecipeResponse create(RecipeCreationRequest recipe, String username);

  RecipeResponse update(RecipeUpdateRequest recipeUpdateRequest, String username);

  String delete(String recipeId, String username);

  List<RecipeResponse> getRecipes();

  RecipeResponse getRecipeId(String id);

  RecipeResponse getRecipeName(String name);

  List<RecipeResponse> getMyRecipes(String username);
}
