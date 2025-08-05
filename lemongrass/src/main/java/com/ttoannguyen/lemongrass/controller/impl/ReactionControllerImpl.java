package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.ReactionController;
import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import com.ttoannguyen.lemongrass.service.ReactionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReactionControllerImpl implements ReactionController {
  ReactionService reactionService;

  @Override
  public ApiResponse<Boolean> toggleHeartPost(String postId) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    ReactionRequest request = new ReactionRequest();
    request.setUsername(username); // username của người thả tim
    request.setTargetId(postId); // ID bài viết
    request.setTargetType(ReactionTargetType.POST); // Thả tim cho bài viết

    boolean liked = reactionService.handleLike(request);

    return ApiResponse.<Boolean>builder().result(liked).build();
  }

  @Override
  public ApiResponse<Boolean> toggleHeartRecipe(String recipeId) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    ReactionRequest request = new ReactionRequest();
    request.setUsername(username);
    request.setTargetId(recipeId);
    request.setTargetType(ReactionTargetType.RECIPE);

    boolean liked = reactionService.handleLike(request);

    return ApiResponse.<Boolean>builder().result(liked).build();
  }

  @Override
  public ApiResponse<List<String>> getLikedPostIds() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    List<String> likedPostIds = reactionService.getLikedPostIds(username);
    return ApiResponse.<List<String>>builder().result(likedPostIds).build();
  }

  @Override
  public ApiResponse<List<String>> getLikedRecipeIds() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    List<String> likedRecipeIds = reactionService.getLikedRecipeIds(username);
    return ApiResponse.<List<String>>builder().result(likedRecipeIds).build();
  }
}
