// package com.ttoannguyen.lemongrass.controller.impl;
//
// import com.ttoannguyen.lemongrass.controller.ReactionController;
// import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;
// import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
// import com.ttoannguyen.lemongrass.entity.Reaction;
// import com.ttoannguyen.lemongrass.service.ReactionService;
// import lombok.AccessLevel;
// import lombok.RequiredArgsConstructor;
// import lombok.experimental.FieldDefaults;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.RestController;
//
// @RestController
// @RequiredArgsConstructor
// @FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
// public class ReactionControllerImpl implements ReactionController {
//  ReactionService reactionService;
//
//  @Override
//  public ApiResponse<Boolean> toggleHeart(ReactionRequest request) {
//    boolean isLiked = reactionService.toggleHeart(request);
//    return ApiResponse.<Boolean>builder()
//        .message(isLiked ? "Reaction added successfully" : "Reaction removed successfully")
//        .result(isLiked)
//        .build();
//  }
// }
