package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;

public interface NotificationService {
  void createNotification(
      String accountId, String message, ReactionTargetType targetType, String targetId);
}
