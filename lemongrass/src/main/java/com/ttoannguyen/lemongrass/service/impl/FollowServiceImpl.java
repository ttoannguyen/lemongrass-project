package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.follow.FollowRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Follow;
import com.ttoannguyen.lemongrass.entity.enums.FollowTargetType;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.FollowRepository;
import com.ttoannguyen.lemongrass.service.FollowService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FollowServiceImpl implements FollowService {

  AccountRepository accountRepository;
  FollowRepository followRepository;
  AccountMapper accountMapper;

  @Override
  @Transactional
  public void follow(FollowRequest request, String username) {
    Account follower =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Account targetAccount =
        accountRepository
            .findById(request.getTargetId())
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    boolean alreadyFollowed =
        followRepository
            .findByFollowerAndTargetIdAndTargetType(
                follower, targetAccount.getId(), FollowTargetType.USER)
            .isPresent();
    if (alreadyFollowed) throw new AppException(ErrorCode.ALREADY_FOLLOWED);
    Follow follow =
        Follow.builder()
            .follower(follower)
            .targetId(targetAccount.getId())
            .targetType(FollowTargetType.USER)
            .build();
    followRepository.save(follow);
  }

  @Override
  @Transactional
  public void unFollow(FollowRequest request, String username) {
    Account follower =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Account targetAccount =
        accountRepository
            .findById(request.getTargetId())
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    followRepository.deleteByFollowerAndTargetIdAndTargetType(
        follower, targetAccount.getId(), request.getType());
  }

  @Override
  public List<AccountResponse> getMyFollowing(String username) {
    Account follower =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    List<Follow> followings =
        followRepository.findByFollowerAndTargetType(follower, FollowTargetType.USER);

    List<Account> targets =
        followings.stream()
            .map(f -> accountRepository.findById(f.getTargetId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .toList();

    return targets.stream().map(accountMapper::toAccountResponse).toList();
  }

  @Override
  public List<AccountResponse> getMyFollower(String username) {
    Account target =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    List<Follow> followers =
        followRepository.findByTargetIdAndTargetType(target.getId(), FollowTargetType.USER);

    List<Account> accounts = followers.stream().map(Follow::getFollower).toList();

    return accounts.stream().map(accountMapper::toAccountResponse).toList();
  }

  @Override
  public List<AccountResponse> getFollowing(String id) {
    Account account =
        accountRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    return getMyFollowing(account.getUsername());
  }

  @Override
  public List<AccountResponse> getFollower(String id) {
    Account account =
        accountRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    return getMyFollower(account.getUsername());
  }

  @Override
  public long countMyFollowing(String username) {
    Account follower =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    return followRepository.countByFollowerAndTargetType(follower, FollowTargetType.USER);
  }

  @Override
  public long countMyFollower(String username) {
    Account target =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    return followRepository.countByTargetIdAndTargetType(target.getId(), FollowTargetType.USER);
  }

  @Override
  public long countFollowing(String id) {
    Account follower =
        accountRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    return followRepository.countByFollowerAndTargetType(follower, FollowTargetType.USER);
  }

  @Override
  public long countFollower(String id) {
    Account target =
        accountRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    return followRepository.countByTargetIdAndTargetType(target.getId(), FollowTargetType.USER);
  }
}
