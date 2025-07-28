package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.RecipeController;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.search.document.RecipeDocument;
import com.ttoannguyen.lemongrass.search.dto.SearchRequest;
import com.ttoannguyen.lemongrass.search.service.SearchService;
import com.ttoannguyen.lemongrass.service.RecipeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecipeControllerImpl implements RecipeController {
  RecipeService recipeService;
  SearchService searchService;

  @Override
  public ApiResponse<RecipeResponse> create(RecipeCreationRequest request) {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<RecipeResponse>builder()
        .result(recipeService.create(request, username))
        .build();
  }

  @Override
  public ApiResponse<RecipeResponse> update(RecipeUpdateRequest request) {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<RecipeResponse>builder()
        .result(recipeService.update(request, username))
        .build();
  }

  @Override
  public ApiResponse<String> delete(String id) {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<String>builder()
        .result(recipeService.delete(id, username))
        .message("success")
        .build();
  }

  @Override
  public ApiResponse<List<RecipeResponse>> getRecipes() {
    return ApiResponse.<List<RecipeResponse>>builder().result(recipeService.getRecipes()).build();
  }

  @Override
  public ApiResponse<RecipeResponse> getRecipeById(String id) {
    return ApiResponse.<RecipeResponse>builder().result(recipeService.getRecipeId(id)).build();
  }

  @Override
  public ApiResponse<List<RecipeResponse>> getMyRecipes() {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<List<RecipeResponse>>builder()
        .result(recipeService.getMyRecipes(username))
        .build();
  }

  @Override
  public CompletableFuture<ResponseEntity<List<RecipeDocument>>> searchRecipes(
      @RequestBody SearchRequest request) {
    log.debug("Received search request with keyword: {}", request.getKeyword());
    return searchService
        .search(request)
        .thenApply(
            recipes -> {
              log.debug("Search completed, found {} recipes", recipes.size());
              return ResponseEntity.ok(recipes);
            })
        .exceptionally(
            throwable -> {
              log.error("Search failed: {}", throwable.getMessage(), throwable);
              return ResponseEntity.status(500).body(null);
            });
  }
}
