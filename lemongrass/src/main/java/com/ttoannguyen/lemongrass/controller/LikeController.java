package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;
import com.ttoannguyen.lemongrass.service.ReactionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LikeController {
  ReactionService reactionService;

  @MessageMapping("/like")
  public void handleLike(ReactionRequest request) {
    reactionService.toggleHeart(request);
  }
}
