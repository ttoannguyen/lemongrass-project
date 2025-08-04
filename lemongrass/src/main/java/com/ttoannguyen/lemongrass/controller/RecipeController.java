package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.search.document.RecipeDocument;
import com.ttoannguyen.lemongrass.search.dto.SearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RequestMapping("/api/_v1/recipes")
public interface RecipeController {
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ApiResponse<RecipeResponse> create(@ModelAttribute RecipeCreationRequest request);

  @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ApiResponse<RecipeResponse> update(@ModelAttribute RecipeUpdateRequest request);

  @PostMapping("/delete/{recipeId}")
  ApiResponse<String> delete(@PathVariable("recipeId") String id);

  @GetMapping
  ApiResponse<Page<RecipeResponse>> getRecipes(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(required = false) String keyword,
      @RequestParam(required = false) List<String> categoryIds,
      @RequestParam(required = false) Integer maxTime);

  @GetMapping("/{recipeId}")
  ApiResponse<RecipeResponse> getRecipeById(@PathVariable("recipeId") String id);

  @GetMapping("/myRecipes")
  ApiResponse<List<RecipeResponse>> getMyRecipes();

  @GetMapping("/account/{accountId}")
  ApiResponse<List<RecipeResponse>> getAccountRecipes(@PathVariable("accountId") String id);

  @PostMapping("/search")
  CompletableFuture<ResponseEntity<List<RecipeDocument>>> searchRecipes(
      @RequestBody SearchRequest request);

  @PostMapping("/autocomplete")
  CompletableFuture<List<RecipeDocument>> autocomplete(@RequestBody String keyword);

  @PostMapping("/natural-search")
  CompletableFuture<List<RecipeDocument>> naturalSearch(@RequestParam String keyword);
}
