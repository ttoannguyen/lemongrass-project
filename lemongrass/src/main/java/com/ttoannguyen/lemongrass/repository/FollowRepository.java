package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.enums.FollowTargetType;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Follow;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, String> {
  Optional<Follow> findByFollowerAndTargetIdAndTargetType(
      Account follower, String targetId, FollowTargetType type);

  void deleteByFollowerAndTargetIdAndTargetType(
      Account follower, String targetId, FollowTargetType type);

  List<Follow> findByFollowerAndTargetType(Account follower, FollowTargetType type);

  List<Follow> findByTargetIdAndTargetType(String targetId, FollowTargetType type);

  long countByFollowerAndTargetType(Account follower, FollowTargetType type);

  long countByTargetIdAndTargetType(String targetId, FollowTargetType type);
}
