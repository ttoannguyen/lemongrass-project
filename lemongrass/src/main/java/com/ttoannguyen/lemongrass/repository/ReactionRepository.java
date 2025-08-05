package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Reaction;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, String> {
  Reaction findByAccount_IdAndTargetIdAndTargetType(
      String accountId, String targetId, ReactionTargetType targetType);

  boolean existsByAccount_IdAndTargetIdAndTargetType(
      String accountId, String targetId, ReactionTargetType targetType);

  Long countByTargetIdAndTargetType(String targetId, ReactionTargetType targetType);

  List<Reaction> findByAccount_IdAndTargetType(String accountId, ReactionTargetType targetType);

  @Query(
      "SELECT r.targetId FROM Reaction r WHERE r.account.id = :accountId AND r.targetType = :targetType")
  List<String> findTargetIdsByAccountIdAndTargetType(
      String accountId, ReactionTargetType targetType);
}
