package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.ReactionController;
import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import com.ttoannguyen.lemongrass.service.ReactionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReactionControllerImpl implements ReactionController {
  ReactionService reactionService;

  @Override
  public ApiResponse<Boolean> toggleHeart(String postId, Principal principal) {
    ReactionRequest request = new ReactionRequest();
    request.setUsername(principal.getName()); // username của người thả tim
    request.setTargetId(postId); // ID bài viết
    request.setTargetType(ReactionTargetType.POST); // Thả tim cho bài viết

    boolean liked =
        reactionService.handleLike(request); // xử lý like + trả true nếu đã like, false nếu unlike

    return ApiResponse.<Boolean>builder().result(liked).build();
  }
}
