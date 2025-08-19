package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.comment.CommentResponse;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeGetUpdateResponse;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface RecipeService {
  RecipeResponse create(RecipeCreationRequest recipe, String username);

  RecipeResponse update(RecipeUpdateRequest recipeUpdateRequest, String username);

  String delete(String recipeId, String username);

  @PreAuthorize("hasRole('ADMIN')")
  String unableRecipe(String recipeId, String username);

  @PreAuthorize("hasRole('ADMIN')")
  String enableRecipe(String recipeId, String username);

  Page<RecipeResponse> getRecipes(
      Pageable pageable, String keyword, List<String> categoryIds, Integer maxTime);

  RecipeResponse getRecipeId(String id);

  RecipeGetUpdateResponse getUpdateRecipeId(String id);

  RecipeResponse getRecipeName(String name);

  List<RecipeResponse> getMyRecipes(String username);

  List<RecipeResponse> getAccountRecipe(String id);

  void rateRecipe(String recipeId, Double rating, String username);
}
