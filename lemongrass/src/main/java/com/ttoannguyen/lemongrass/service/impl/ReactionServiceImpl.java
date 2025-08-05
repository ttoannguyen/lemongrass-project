package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.reaction.ReactionRequest;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.Reaction;
import com.ttoannguyen.lemongrass.entity.Recipe;
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
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReactionServiceImpl implements ReactionService {
  AccountRepository accountRepository;
  ReactionRepository reactionRepository;
  PostRepository postRepository;
  RecipeRepository recipeRepository;
  // CommentRepository commentRepository;
  // SimpMessagingTemplate messagingTemplate;
  NotificationService notificationService;

  // NotificationRepository notificationRepository;

  //  @Override
  //  public void toggleHeartPost(ReactionRequest request) {
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
    Account sender =
        accountRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    String targetId = request.getTargetId();
    ReactionTargetType targetType = request.getTargetType();

    String targetAccountId;
    String contentTitle;

    if (targetType == ReactionTargetType.POST) {
      Post post =
          postRepository
              .findById(targetId)
              .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
      targetAccountId = post.getAccount().getId();
      contentTitle = post.getTitle();
    } else if (targetType == ReactionTargetType.RECIPE) {
      Recipe recipe =
          recipeRepository
              .findById(targetId)
              .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
      targetAccountId = recipe.getAccount().getId();
      contentTitle = recipe.getTitle();
    } else {
      throw new AppException(ErrorCode.INVALID_KEY);
    }

    Reaction existingReaction =
        reactionRepository.findByAccount_IdAndTargetIdAndTargetType(
            sender.getId(), targetId, targetType);

    if (existingReaction != null) {
      reactionRepository.delete(existingReaction);
      return false;
    }

    Reaction reaction =
        Reaction.builder().account(sender).targetId(targetId).targetType(targetType).build();
    reactionRepository.save(reaction);

    if (!sender.getId().equals(targetAccountId)) {
      Account receiver =
          accountRepository
              .findById(targetAccountId)
              .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
      notificationService.sendLikeNotification(
          sender, receiver, targetId, String.valueOf(targetType), contentTitle);
    }

    return true;
  }

  //  @Override
  //  @Transactional
  //  public boolean handleLike(ReactionRequest request) {
  //    // 1. Lấy account người gửi và post
  //    Account sender =
  //        accountRepository
  //            .findByUsername(request.getUsername())
  //            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
  //    if (request.getTargetType() == ReactionTargetType.POST) {
  //      Post post =
  //          postRepository
  //              .findById(request.getTargetId())
  //              .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
  //    }
  //
  //    if (request.getTargetType() == ReactionTargetType.RECIPE) {
  //      Recipe recipe =
  //          reactionRepository
  //              .findById(request.getTargetId())
  //              .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));
  //    }
  //
  //    Reaction existingReaction =
  //        reactionRepository.findByAccount_IdAndTargetIdAndTargetType(
  //            sender.getId(), post.getId(), request.getTargetType());
  //
  //    if (existingReaction != null) {
  //      // Đã like trước đó => unlike
  //      reactionRepository.delete(existingReaction);
  //      return false;
  //    }
  //
  //    // Chưa like => tạo mới Reaction
  //    Reaction reaction =
  //        Reaction.builder()
  //            .account(sender)
  //            .targetId(post.getId())
  //            .targetType(request.getTargetType())
  //            .build();
  //    reactionRepository.save(reaction);
  //
  //    // Gửi thông báo nếu không phải tự like chính mình
  //    Account receiver = post.getAccount();
  //    if (!sender.getId().equals(receiver.getId())) {
  //      notificationService.sendLikeNotification(sender, receiver, post);
  //    }
  //
  //    return true;
  //  }

  @Override
  public List<String> getLikedPostIds(String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    return reactionRepository.findTargetIdsByAccountIdAndTargetType(
        account.getId(), ReactionTargetType.POST);
  }

  @Override
  public List<String> getLikedRecipeIds(String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    return reactionRepository.findTargetIdsByAccountIdAndTargetType(
        account.getId(), ReactionTargetType.RECIPE);
  }

  //  private String getCurrentUsername() {
  //    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
  //    if (authentication == null || authentication.getName() == null) {
  //      throw new AppException(ErrorCode.UNAUTHORIZED);
  //    }
  //    return authentication.getName();
  //  }
}
