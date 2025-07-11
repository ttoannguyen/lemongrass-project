package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;

import java.util.List;

public interface SavedRecipeService {
  boolean saveRecipe(String username, String recipeId);

  boolean unSaveRecipe(String username, String recipeId);

  boolean isSave(String username, String recipeId);

  List<RecipeResponse> getSavedRecipes(String username);
}
