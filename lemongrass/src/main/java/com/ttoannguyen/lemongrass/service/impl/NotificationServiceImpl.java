package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Response.notification.NotificationMessage;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Notification;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.enums.NotificationType;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.NotificationRepository;
import com.ttoannguyen.lemongrass.repository.PostRepository;
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
  PostRepository postRepository;
  AccountMapper accountMapper;

  @Override
  public void createNotification(
      String accountId, String message, ReactionTargetType targetType, String targetId) {
    Account account =
        accountRepository
            .findById(accountId)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    Post post =
        postRepository
            .findById(targetId)
            .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

    Account author = post.getAccount();
    Notification notification =
        Notification.builder()
            .sender(account)
            .receiver(author)
            .content(message)
            .type(NotificationType.POST)
            .isRead(false)
            .build();
    notificationRepository.save(notification);

    simpMessagingTemplate.convertAndSendToUser(accountId, "/topic/notifications", notification);
  }

  //  @Override
  //  public void sendLikeNotification(Account sender, Account receiver, Post post) {
  //
  //    NotificationMessage notification =
  //        NotificationMessage.builder()
  //            .sender(accountMapper.toAccountResponse(sender))
  //            .receiver(accountMapper.toAccountResponse(receiver))
  //            .targetId(post.getId())
  //            .message(sender.getUsername() + "Đã thích bài viết của bạn")
  //            .targetType("POST")
  //            .build();
  //
  //    simpMessagingTemplate.convertAndSendToUser(
  //        receiver.getId(), "/queue/notifications", notification);
  //  }

  @Override
  public void sendLikeNotification(
      Account sender, Account receiver, String targetId, String targetType, String title) {
    // Không gửi thông báo nếu tự like chính mình
    if (sender.getId().equals(receiver.getId())) {
      return;
    }

    // Xây dựng nội dung thông báo theo loại target
    String message;
    switch (targetType) {
      case "POST":
        message = sender.getUsername() + " đã thích bài viết của bạn: " + title;
        break;
      case "RECIPE":
        message = sender.getUsername() + " đã thích công thức của bạn: " + title;
        break;
      default:
        message = sender.getUsername() + " đã thích nội dung của bạn";
        break;
    }

    NotificationMessage notification =
        NotificationMessage.builder()
            .sender(accountMapper.toAccountResponse(sender))
            .receiver(accountMapper.toAccountResponse(receiver))
            .targetId(targetId)
            .targetType(targetType)
            .message(message)
            .build();

    simpMessagingTemplate.convertAndSendToUser(
        receiver.getId().toString(), "/queue/notifications", notification);
  }
}
