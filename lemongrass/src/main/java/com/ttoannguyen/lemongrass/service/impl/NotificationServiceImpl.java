package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Notification;
import com.ttoannguyen.lemongrass.entity.enums.NotificationType;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.NotificationRepository;
import com.ttoannguyen.lemongrass.service.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationServiceImpl implements NotificationService {

  NotificationRepository notificationRepository;
  AccountRepository accountRepository;
  SimpMessagingTemplate simpMessagingTemplate;

  @Override
  public void createNotification(
      String accountId, String message, ReactionTargetType targetType, String targetId) {
    Account account =
        accountRepository
            .findById(accountId)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    Notification notification =
        Notification.builder()
            .account(account)
            .content(message)
            .type(NotificationType.POST)
            .isRead(false)
            .build();
    notificationRepository.save(notification);

    simpMessagingTemplate.convertAndSendToUser(accountId, "/topic/notifications", notification);
  }
}
