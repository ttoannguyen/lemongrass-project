package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;

import java.util.List;

public interface ReactionService {
  //  void toggleHeartPost(ReactionRequest request);

  boolean handleLike(ReactionRequest request);

  List<String> getLikedPostIds(String username);

  List<String> getLikedRecipeIds(String username);

  Integer getCountLikedRecipeId(String id);

  Integer getCountLikedPostId(String id);
}
