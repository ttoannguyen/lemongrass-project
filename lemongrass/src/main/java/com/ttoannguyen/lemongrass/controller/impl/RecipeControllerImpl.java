package com.ttoannguyen.lemongrass.controller.impl;

import com.cloudinary.Api;
import com.ttoannguyen.lemongrass.controller.RecipeController;
import com.ttoannguyen.lemongrass.dto.PageResponse.PageResponse;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RateRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeGetUpdateResponse;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
  public ApiResponse<String> unableRecipe(String id) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<String>builder().result(recipeService.unableRecipe(id, username)).build();
  }

  @Override
  public ApiResponse<String> enableRecipe(String id) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<String>builder().result(recipeService.enableRecipe(id, username)).build();
  }

  @Override
  public ApiResponse<PageResponse<RecipeResponse>> getRecipes(
      int page, int size, String keyword, List<String> categoryIds, Integer maxTime) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<RecipeResponse> result =
        recipeService.getRecipes(pageRequest, keyword, categoryIds, maxTime = 999);
    return ApiResponse.<PageResponse<RecipeResponse>>builder()
        .result(PageResponse.from(result))
        .build();
  }

  @Override
  public ApiResponse<RecipeResponse> getRecipeById(String id) {
    return ApiResponse.<RecipeResponse>builder().result(recipeService.getRecipeId(id)).build();
  }

  @Override
  public ApiResponse<RecipeGetUpdateResponse> getUpdateRecipeById(String id) {
    return ApiResponse.<RecipeGetUpdateResponse>builder()
        .result(recipeService.getUpdateRecipeId(id))
        .build();
  }

  @Override
  public ApiResponse<List<RecipeResponse>> getMyRecipes() {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<List<RecipeResponse>>builder()
        .result(recipeService.getMyRecipes(username))
        .build();
  }

  @Override
  public ApiResponse<List<RecipeResponse>> getAccountRecipes(String id) {
    return ApiResponse.<List<RecipeResponse>>builder()
        .result(recipeService.getAccountRecipe(id))
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

  @Override
  public CompletableFuture<List<RecipeDocument>> autocomplete(String keyword) {
    return searchService.autocomplete(keyword);
  }

  @Override
  public CompletableFuture<List<RecipeDocument>> naturalSearch(String keyword) {
    return searchService.naturalSearch(keyword);
  }

  @Override
  public ApiResponse<Void> rateRecipe(String recipeId, RateRequest rateRequest) {
    final String username = SecurityContextHolder.getContext().getAuthentication().getName();
    recipeService.rateRecipe(recipeId, rateRequest.getRating(), username);
    return ApiResponse.<Void>builder().message("Success").build();
  }
}
