package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, String> {
}
