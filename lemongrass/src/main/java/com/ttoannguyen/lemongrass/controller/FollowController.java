package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.follow.FollowRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.dto.Response.follow.FollowCountResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/follows")
public interface FollowController {

  // Follow ai đó
  @PostMapping("/setFollow")
  ApiResponse<Void> follow(@RequestBody FollowRequest request);

  // Bỏ theo dõi ai đó
  @PostMapping("/unFollow")
  ApiResponse<Void> unFollow(@RequestBody FollowRequest request);

  // Lấy số follower / following của username
  @GetMapping("/follow-count/{username}")
  ApiResponse<FollowCountResponse> getFollowCount(@PathVariable String username);

  // Lấy danh sách người mình đang theo dõi
  @GetMapping("/my-following")
  ApiResponse<List<AccountResponse>> getMyFollowing();

  // Lấy danh sách người đang theo dõi mình
  @GetMapping("/my-follower")
  ApiResponse<List<AccountResponse>> getMyFollower();

  // Lấy danh sách người mà user có id đang theo dõi
  @GetMapping("/user-following/{id}")
  ApiResponse<List<AccountResponse>> getFollowing(@PathVariable String id);

  // Lấy danh sách người đang theo dõi user có id
  @GetMapping("/user-follower/{id}")
  ApiResponse<List<AccountResponse>> getFollower(@PathVariable String id);

  // Lấy số follower/following của user theo id
  @GetMapping("/follow-count-by-id/{id}")
  ApiResponse<FollowCountResponse> getFollowCountById(@PathVariable String id);
}
