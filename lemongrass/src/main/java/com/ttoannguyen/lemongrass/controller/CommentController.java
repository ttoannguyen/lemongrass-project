package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.comment.CommentRequest;
import com.ttoannguyen.lemongrass.dto.Response.comment.CommentResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/comments")
public interface CommentController {
  @PostMapping
  ApiResponse<CommentResponse> createComment(@RequestBody CommentRequest commentDTO);

  @GetMapping("/recipe/{recipeId}")
  ApiResponse<List<CommentResponse>> getCommentRecipeId(@PathVariable("recipeId") String recipeId);

  @PostMapping("/recipe/{recipeId}/delete")
  ApiResponse<Void> deletedComment(@PathVariable("recipeId") String recipeId);
}
