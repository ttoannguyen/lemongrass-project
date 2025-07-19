package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@RequestMapping("/api/_v1/reaction")
public interface ReactionController {

  @PostMapping("/like/{postId}")
  ApiResponse<Boolean> toggleHeart(@PathVariable String postId, Principal principal);
}
