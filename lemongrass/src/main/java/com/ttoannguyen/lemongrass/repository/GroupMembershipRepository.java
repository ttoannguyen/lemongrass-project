package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Group;
import com.ttoannguyen.lemongrass.entity.enums.GroupRole;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.GroupMembership;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMembershipRepository extends JpaRepository<GroupMembership, String> {
  boolean existsByGroupAndAccount(Group group, Account account);

  Optional<GroupMembership> findByGroupAndAccount(Group group, Account account);

  long countByGroupAndRole(Group group, GroupRole groupRole);

  List<GroupMembership> findByAccount(Account account);
}
