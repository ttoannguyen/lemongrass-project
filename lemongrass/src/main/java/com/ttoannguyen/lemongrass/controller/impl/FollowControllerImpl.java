package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.FollowController;
import com.ttoannguyen.lemongrass.dto.Request.follow.FollowRequest;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.FollowService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FollowControllerImpl implements FollowController {

  FollowService followService;

  @Override
  public ApiResponse<Void> follow(FollowRequest request) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    followService.follow(request, username);
    return ApiResponse.<Void>builder().message("success").build();
  }

  @Override
  public ApiResponse<Void> unFollow(FollowRequest request) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    followService.unFollow(request, username);
    return ApiResponse.<Void>builder().message("success").build();
  }
}
