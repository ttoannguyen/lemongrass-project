package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Response.notification.NotificationMessage;
import com.ttoannguyen.lemongrass.dto.Response.notification.NotificationResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Notification;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.entity.enums.NotificationType;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.NotificationRepository;
import com.ttoannguyen.lemongrass.repository.PostRepository;
import com.ttoannguyen.lemongrass.repository.RecipeRepository;
import com.ttoannguyen.lemongrass.service.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationServiceImpl implements NotificationService {

  NotificationRepository notificationRepository;
  AccountRepository accountRepository;
  SimpMessagingTemplate simpMessagingTemplate;
  PostRepository postRepository;
  AccountMapper accountMapper;
  RecipeRepository recipeRepository;

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

  @Override
  public void sendLikeNotification(
      Account sender, Account receiver, String targetId, String targetType, String title) {
    if (sender.getId().equals(receiver.getId())) {
      return;
    }

    String message =
        switch (targetType) {
          case "POST" -> sender.getUsername() + " đã thích bài viết của bạn: " + title;
          case "RECIPE" -> sender.getUsername() + " đã thích công thức của bạn: " + title;
          default -> sender.getUsername() + " đã thích nội dung của bạn";
        };

    Notification.NotificationBuilder builder =
        Notification.builder()
            .sender(sender)
            .receiver(receiver)
            .content(message)
            .type(NotificationType.valueOf(targetType))
            .isRead(false);

    switch (targetType) {
      case "POST" -> {
        Post post =
            postRepository
                .findById(targetId)
                .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
        builder.post(post);
      }
      case "RECIPE" -> {
        Recipe recipe =
            recipeRepository
                .findById(targetId)
                .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
        builder.recipe(recipe);
      }
    }

    Notification notificationSaved = notificationRepository.save(builder.build());

    NotificationMessage notification =
        NotificationMessage.builder()
            .sender(accountMapper.toAccountResponse(sender))
            .receiver(accountMapper.toAccountResponse(receiver))
            .targetId(targetId)
            .targetType(targetType)
            .message(message)
            .build();

    simpMessagingTemplate.convertAndSendToUser(
        receiver.getId(), "/queue/notifications", notification);
  }

  @Override
  public List<NotificationResponse> getUserNotifications(String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    List<Notification> notifications =
        notificationRepository.findByReceiver_IdOrderByCreatedDateDesc(account.getId());
    return notifications.stream()
        .map(
            n -> {
              String targetId = null;
              String targetType = null;

              if (n.getPost() != null) {
                targetId = n.getPost().getId();
                targetType = "POST";
              } else if (n.getRecipe() != null) {
                targetId = n.getRecipe().getId();
                targetType = "RECIPE";
              }

              return NotificationResponse.builder()
                  .id(n.getId())
                  .sender(accountMapper.toAccountResponse(n.getSender()))
                  .receiver(accountMapper.toAccountResponse(n.getReceiver()))
                  .message(n.getContent())
                  .targetId(targetId)
                  .targetType(targetType)
                  .isRead(n.isRead())
                  .createdDate(n.getCreatedDate())
                  .build();
            })
        .toList();
  }
}
