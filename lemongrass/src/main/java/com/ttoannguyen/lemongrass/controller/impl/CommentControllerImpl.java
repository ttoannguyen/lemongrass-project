package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.CommentController;
import com.ttoannguyen.lemongrass.dto.Request.comment.CommentRequest;
import com.ttoannguyen.lemongrass.dto.Response.comment.CommentResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.CommentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentControllerImpl implements CommentController {
  CommentService commentService;

  @Override
  public ApiResponse<CommentResponse> createComment(CommentRequest request) {
    String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
    CommentResponse commentResponse = commentService.createComment(request, currentUsername);
    return ApiResponse.<CommentResponse>builder().result(commentResponse).build();
  }

  @Override
  public ApiResponse<List<CommentResponse>> getCommentRecipeId(String recipeId) {
    List<CommentResponse> commentResponseList = commentService.getCommentsByRecipeId(recipeId);
    return ApiResponse.<List<CommentResponse>>builder().result(commentResponseList).build();
  }

  @Override
  public ApiResponse<Void> deletedComment(String recipeId) {
    String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
    commentService.deleteComment(recipeId, currentUsername);
    return ApiResponse.<Void>builder().message("success").build();
  }
}
