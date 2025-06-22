package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;

public interface RecipeService {
  RecipeResponse create(Recipe recipe);
}
