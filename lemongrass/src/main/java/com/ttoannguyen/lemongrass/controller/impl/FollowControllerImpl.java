package com.ttoannguyen.lemongrass.controller.impl;

import com.cloudinary.Api;
import com.ttoannguyen.lemongrass.controller.FollowController;
import com.ttoannguyen.lemongrass.dto.Request.follow.FollowRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.dto.Response.follow.FollowCountResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.FollowService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

  @Override
  public ApiResponse<FollowCountResponse> getFollowCount(String username) {

    return null;
  }

  @Override
  public ApiResponse<List<AccountResponse>> getMyFollowing() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<List<AccountResponse>>builder()
        .result(followService.getMyFollowing(username))
        .build();
  }

  @Override
  public ApiResponse<List<AccountResponse>> getMyFollower() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<List<AccountResponse>>builder()
        .result(followService.getMyFollower(username))
        .build();
  }

  @Override
  public ApiResponse<List<AccountResponse>> getFollowing(String id) {
    return ApiResponse.<List<AccountResponse>>builder()
        .result(followService.getFollowing(id))
        .build();
  }

  @Override
  public ApiResponse<List<AccountResponse>> getFollower(String id) {
    return ApiResponse.<List<AccountResponse>>builder()
        .result(followService.getFollower(id))
        .build();
  }

  @Override
  public ApiResponse<FollowCountResponse> getFollowCountById(String id) {
    long follower = followService.countFollower(id);
    long following = followService.countFollowing(id);
    final FollowCountResponse response =
        FollowCountResponse.builder().followerCount(follower).followingCount(following).build();
    return ApiResponse.<FollowCountResponse>builder().result(response).build();
  }

  @Override
  public ApiResponse<Boolean> isFollowing(String targetId) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<Boolean>builder()
        .result(followService.isFollowing(targetId, username))
        .build();
  }
}
