package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Follow;
import com.ttoannguyen.lemongrass.entity.Reaction;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.entity.enums.FollowTargetType;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.RecipeMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.FollowRepository;
import com.ttoannguyen.lemongrass.repository.ReactionRepository;
import com.ttoannguyen.lemongrass.repository.RecipeRepository;
import com.ttoannguyen.lemongrass.service.RecommendationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RecommendationServiceImpl implements RecommendationService {
  ReactionRepository reactionRepository;
  FollowRepository followRepository;
  AccountRepository accountRepository;
  RecipeRepository recipeRepository;
  RecipeMapper recipeMapper;

  @Override
  public List<RecipeResponse> recommendRecipes(String username, int topN) {
    List<Recipe> recipes;

    // Trường hợp chưa đăng nhập hoặc username rỗng
    if (username == null || username.isBlank()) {
      recipes = recipeRepository.findAllByOrderByLikeCountDesc(PageRequest.of(0, topN));
    } else {
      Account account =
          accountRepository
              .findByUsername(username)
              .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

      // Lấy danh sách recipe user đã like
      List<String> myRecipeIds =
          reactionRepository.findTargetIdsByAccountIdAndTargetType(
              account.getId(), ReactionTargetType.RECIPE);

      // Lấy danh sách người user follow
      Set<String> followeeIds =
          followRepository.findByFollowerAndTargetType(account, FollowTargetType.USER).stream()
              .map(Follow::getTargetId)
              .collect(Collectors.toSet());

      // Nếu chưa like và chưa follow → fallback top phổ biến
      if (myRecipeIds.isEmpty() && followeeIds.isEmpty()) {
        recipes = recipeRepository.findAllByOrderByLikeCountDesc(PageRequest.of(0, topN));
      } else {
        // Collaborative Filtering: tìm các user giống nhau
        List<Reaction> reactionsOfOthers =
            reactionRepository.findByTargetIdInAndAccount_IdNot(myRecipeIds, account.getId());

        Map<String, Long> userSimilarity =
            reactionsOfOthers.stream()
                .collect(Collectors.groupingBy(r -> r.getAccount().getId(), Collectors.counting()));

        List<String> similarUserIds = new ArrayList<>(userSimilarity.keySet());
        List<Reaction> candidateReactions = reactionRepository.findByAccount_IdIn(similarUserIds);

        Map<String, Long> recipeScores = new HashMap<>();
        for (Reaction r : candidateReactions) {
          if (r.getTargetType() == ReactionTargetType.RECIPE
              && !myRecipeIds.contains(r.getTargetId())) {
            recipeScores.put(
                r.getTargetId(),
                recipeScores.getOrDefault(r.getTargetId(), 0L)
                    + userSimilarity.get(r.getAccount().getId()));
          }
        }

        // Tăng điểm cho recipe từ người follow
        candidateReactions.stream()
            .filter(
                r ->
                    followeeIds.contains(r.getAccount().getId())
                        && r.getTargetType() == ReactionTargetType.RECIPE)
            .forEach(
                r ->
                    recipeScores.put(
                        r.getTargetId(), recipeScores.getOrDefault(r.getTargetId(), 0L) + 5));

        // Sắp xếp và lấy top N
        List<String> sortedRecipeIds =
            recipeScores.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .limit(topN)
                .toList();

        recipes = recipeRepository.findAllById(sortedRecipeIds);
      }
    }

    return recipeMapper.toRecipeResponseList(recipes);
  }

  //  @Override
  //  public List<RecipeResponse> recommendRecipes(String username, int topN) {
  //    Account account =
  //        accountRepository
  //            .findByUsername(username)
  //            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
  //
  //    List<String> myRecipeIds =
  //        reactionRepository.findTargetIdsByAccountIdAndTargetType(
  //            account.getId(), ReactionTargetType.RECIPE);
  //    List<Reaction> reactionsOfOthers =
  //        reactionRepository.findByTargetIdInAndAccount_IdNot(myRecipeIds, account.getId());
  //
  //    Map<String, Long> userSimilarity =
  //        reactionsOfOthers.stream()
  //            .collect(Collectors.groupingBy(r -> r.getAccount().getId(), Collectors.counting()));
  //
  //    List<String> similarUserIds = new ArrayList<>(userSimilarity.keySet());
  //
  //    List<Reaction> candidateReactions = reactionRepository.findByAccount_IdIn(similarUserIds);
  //
  //    Map<String, Long> recipeScores = new HashMap<>();
  //    for (Reaction r : candidateReactions) {
  //      if (r.getTargetType() == ReactionTargetType.RECIPE
  //          && !myRecipeIds.contains(r.getTargetId())) {
  //        recipeScores.put(
  //            r.getTargetId(),
  //            recipeScores.getOrDefault(r.getTargetId(), 0L)
  //                + userSimilarity.get(r.getAccount().getId()));
  //      }
  //    }
  //
  //    List<Follow> followees =
  //        followRepository.findByFollowerAndTargetType(account, FollowTargetType.USER);
  //    Set<String> followeeIds =
  //        followees.stream().map(Follow::getTargetId).collect(Collectors.toSet());
  //
  //    candidateReactions.stream()
  //        .filter(
  //            r ->
  //                followeeIds.contains(r.getAccount().getId())
  //                    && r.getTargetType() == ReactionTargetType.RECIPE)
  //        .forEach(
  //            r ->
  //                recipeScores.put(
  //                    r.getTargetId(), recipeScores.getOrDefault(r.getTargetId(), 0L) + 5));
  //
  //    List<String> sortedRecipeIds =
  //        recipeScores.entrySet().stream()
  //            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
  //            .map(Map.Entry::getKey)
  //            .limit(topN)
  //            .toList();
  //
  //    List<Recipe> recipes = recipeRepository.findAllById(sortedRecipeIds);
  //
  //    return recipeMapper.toRecipeResponseList(recipes);
  //  }
}
