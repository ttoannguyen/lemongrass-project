package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import com.ttoannguyen.lemongrass.service.ReactionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Slf4j
@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LikeController {
  ReactionService reactionService;

  @MessageMapping("/like")
  public void handleLike(ReactionRequest request) {
    reactionService.handleLike(request);
  }

  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public String greeting(String name) {
    return "Hello, " + name + "!";
  }

  @MessageMapping("/post/like/{postId}")
  public void likePost(@DestinationVariable String postId, Principal principal) {
    log.info("likePost called by {}", principal.getName());
    log.info("likePost called by {}", principal.toString());
    // Tạo ReactionRequest từ postId và username
    ReactionRequest req = new ReactionRequest();
    req.setUsername(principal.getName());
    req.setTargetId(postId);
    req.setTargetType(ReactionTargetType.POST);
    reactionService.handleLike(req);
  }
}
