package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;

public interface NotificationService {
  void createNotification(
      String accountId, String message, ReactionTargetType targetType, String targetId);

  //  void sendLikeNotification(Account sender, Account receiver, Post post);
  void sendLikeNotification(
      Account sender, Account receiver, String targetId, String targetType, String title);
}
