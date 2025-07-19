package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;

public interface ReactionService {
  //  void toggleHeart(ReactionRequest request);

  boolean handleLike(ReactionRequest request);
}
