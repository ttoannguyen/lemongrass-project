package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.comment.CommentRequest;
import com.ttoannguyen.lemongrass.dto.Response.comment.CommentResponse;

import java.util.List;

public interface CommentService {
  CommentResponse createComment(CommentRequest request, String currentUserId);

  List<CommentResponse> getCommentsByRecipeId(String recipeId);

  void deleteComment(String commentId, String currentUsername);
}
