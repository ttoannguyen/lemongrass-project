package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Reaction;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, String> {
  Reaction findByAccount_IdAndTargetIdAndTargetType(
      String accountId, String targetId, ReactionTargetType targetType);

  boolean existsByAccount_IdAndTargetIdAndTargetType(
      String accountId, String targetId, ReactionTargetType targetType);

  Long countByTargetIdAndTargetType(String targetId, ReactionTargetType targetType);
}
