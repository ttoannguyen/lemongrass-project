package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/saved-recipes")
public interface SavedController {
  @PostMapping("/save/{recipeId}")
  ApiResponse<Void> saveRecipe(@PathVariable String recipeId);

  @GetMapping
  ApiResponse<List<RecipeResponse>> getSavedRecipes();

  @PostMapping("/unsave/{recipeId}")
  ApiResponse<Void> unSaveRecipe(@PathVariable String recipeId);
}
