package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupMembershipRepository extends JpaRepository<GroupMembership, String> {
}
