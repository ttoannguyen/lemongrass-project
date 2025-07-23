package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/_v1/recipes")
public interface RecipeController {
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ApiResponse<RecipeResponse> create(@ModelAttribute RecipeCreationRequest request);

  @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ApiResponse<RecipeResponse> update(@ModelAttribute RecipeUpdateRequest request);

  @PostMapping("/delete/{recipeId}")
  ApiResponse<String> delete(@PathVariable("recipeId") String id);

  @GetMapping
  ApiResponse<List<RecipeResponse>> getRecipes();

  @GetMapping("/{recipeId}")
  ApiResponse<RecipeResponse> getRecipeById(@PathVariable("recipeId") String id);

  @GetMapping("/myRecipes")
  ApiResponse<List<RecipeResponse>> getMyRecipes();

  //  @GetMapping("/suggest/{partialProductName}")
  //  ApiResponse<List<String>> suggest(@PathVariable("partialProductName") String
  // partialProductName)
  //      throws IOException;
}
