package com.ttoannguyen.lemongrass.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Group;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, String> {
  boolean existsByName(String name);

  Optional<Group> findByName(String name);

  @Modifying
  @Transactional
  @Query(
      value = "UPDATE groups SET member_count = member_count + 1 WHERE groups_id = :groupId",
      nativeQuery = true)
  void incrementMemberCount(@Param("groupId") String groupId);

  @Modifying
  @Query(
      value =
          "UPDATE groups SET member_count = member_count - 1 WHERE groups_id = :groupId AND member_count > 0",
      nativeQuery = true)
  void decrementMemberCount(@Param("groupId") String groupId);
}
