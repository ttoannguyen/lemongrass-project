package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.follow.FollowRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;

import java.util.List;

public interface FollowService {
  void follow(FollowRequest request, String username);

  void unFollow(FollowRequest request, String username);

  List<AccountResponse> getMyFollowing(String username);

  List<AccountResponse> getMyFollower(String username);

  List<AccountResponse> getFollowing(String id);

  List<AccountResponse> getFollower(String id);

  long countMyFollowing(String username);

  long countMyFollower(String username);

  long countFollowing(String id);

  long countFollower(String id);
}
