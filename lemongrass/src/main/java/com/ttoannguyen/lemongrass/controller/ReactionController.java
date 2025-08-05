package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;
import java.util.List;

@RequestMapping("/api/_v1/reaction")
public interface ReactionController {

  @PostMapping("/like/post/{postId}")
  ApiResponse<Boolean> toggleHeartPost(@PathVariable("postId") String postId);

  @PostMapping("/like/recipe/{recipeId}")
  ApiResponse<Boolean> toggleHeartRecipe(@PathVariable("recipeId") String recipeId);

  @GetMapping("/like/post/ids")
  ApiResponse<List<String>> getLikedPostIds();

  @GetMapping("/like/recipe/ids")
  ApiResponse<List<String>> getLikedRecipeIds();
}
