package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;
import com.ttoannguyen.lemongrass.dto.Response.notification.NotificationMessage;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Notification;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.Reaction;
import com.ttoannguyen.lemongrass.entity.enums.NotificationType;
import com.ttoannguyen.lemongrass.entity.enums.Priority;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.*;
import com.ttoannguyen.lemongrass.service.NotificationService;
import com.ttoannguyen.lemongrass.service.ReactionService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReactionServiceImpl implements ReactionService {
  AccountRepository accountRepository;
  ReactionRepository reactionRepository;
  PostRepository postRepository;
  RecipeRepository recipeRepository;
  CommentRepository commentRepository;
  SimpMessagingTemplate messagingTemplate;
  NotificationService notificationService;
  NotificationRepository notificationRepository;

  //  @Override
  //  public void toggleHeart(ReactionRequest request) {
  //    String username = request.getUsername();
  //    log.info(username);
  //    Account account =
  //        accountRepository
  //            .findByUsername(username)
  //            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
  //    Post post =
  //        postRepository
  //            .findById(request.getTargetId())
  //            .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
  //    Account receiver =
  //        accountRepository
  //            .findById(request.getReceiverId())
  //            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
  //    Reaction existingReaction =
  //        reactionRepository.findByAccount_IdAndTargetIdAndTargetType(
  //            account.getId(), request.getTargetId(), ReactionTargetType.POST);
  //
  //    if (existingReaction != null) {
  //      reactionRepository.delete(existingReaction);
  //    } else {
  //      Reaction reaction =
  //          Reaction.builder()
  //              .targetId(request.getTargetId())
  //              .account(account)
  //              .targetType(ReactionTargetType.POST)
  //              .build();
  //
  //      reactionRepository.save(reaction);
  //
  //      Notification notification =
  //          Notification.builder()
  //              .account(receiver)
  //              .type(NotificationType.POST)
  //              .content(account.getUsername() + " has liked your post: " + post.getTitle())
  //              .post(post)
  //              .priority(Priority.MEDIUM)
  //              .isRead(false)
  //              .build();
  //      notificationRepository.save(notification);
  //
  //      NotificationMessage notificationMessage =
  //          NotificationMessage.builder()
  //              .senderId(account.getId())
  //              .receiverId(receiver.getId())
  //              .message(notification.getContent())
  //              .targetType(ReactionTargetType.POST.name())
  //              .targetId(request.getTargetId())
  //              .build();
  //      log.info(notificationMessage.toString());
  //      messagingTemplate.convertAndSendToUser(
  //          String.valueOf(request.getReceiverId()), "/queue/notifications", notificationMessage);
  //      log.info("{}/queue/notifications{}", request.getReceiverId(), notificationMessage);
  //    }
  //  }

  @Override
  @Transactional
  public boolean handleLike(ReactionRequest request) {
    // 1. Lấy account người gửi và post
    Account sender =
        accountRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Post post =
        postRepository
            .findById(request.getTargetId())
            .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

    Reaction existingReaction =
        reactionRepository.findByAccount_IdAndTargetIdAndTargetType(
            sender.getId(), post.getId(), ReactionTargetType.POST);

    if (existingReaction != null) {
      // Đã like trước đó => unlike
      reactionRepository.delete(existingReaction);
      return false;
    }

    // Chưa like => tạo mới Reaction
    Reaction reaction =
        Reaction.builder()
            .account(sender)
            .targetId(post.getId())
            .targetType(ReactionTargetType.POST)
            .build();
    reactionRepository.save(reaction);

    // Gửi thông báo nếu không phải tự like chính mình
    Account receiver = post.getAccount();
    if (!sender.getId().equals(receiver.getId())) {
      notificationService.sendLikeNotification(sender, receiver, post);
    }

    return true;
  }

  //  private String getCurrentUsername() {
  //    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
  //    if (authentication == null || authentication.getName() == null) {
  //      throw new AppException(ErrorCode.UNAUTHORIZED);
  //    }
  //    return authentication.getName();
  //  }
}
