package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;
import com.ttoannguyen.lemongrass.entity.Reaction;

public interface ReactionService {
  boolean toggleHeart(ReactionRequest request);
}
