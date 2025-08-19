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
  NotificationService notificationService;

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
      recipe.setLikeCount(recipe.getLikeCount() + 1);
      recipeRepository.save(recipe);
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

  @Override
  public Integer getCountLikedRecipeId(String id) {
    return Math.toIntExact(
        reactionRepository.countByTargetIdAndTargetType(id, ReactionTargetType.RECIPE));
  }

  @Override
  public Integer getCountLikedPostId(String id) {
    return Math.toIntExact(
        reactionRepository.countByTargetIdAndTargetType(id, ReactionTargetType.POST));
  }
}
