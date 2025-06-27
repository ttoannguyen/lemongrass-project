package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.recipe.RecipeCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/recipes")
public interface RecipeController {
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ApiResponse<RecipeResponse> create(@ModelAttribute RecipeCreationRequest request);

  @GetMapping
  ApiResponse<List<RecipeResponse>> getRecipes();
}
