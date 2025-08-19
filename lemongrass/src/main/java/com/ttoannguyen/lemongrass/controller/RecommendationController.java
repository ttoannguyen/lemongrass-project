package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequestMapping("/api/_v1/recommendations")
public interface RecommendationController {
  @GetMapping("/recipes")
  ApiResponse<List<RecipeResponse>> getRecommendedRecipes(
      @RequestParam String username, @RequestParam(defaultValue = "3") int topN);
}
