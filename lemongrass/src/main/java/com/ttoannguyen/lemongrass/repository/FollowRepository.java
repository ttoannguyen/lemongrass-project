package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository  extends JpaRepository<Follow, String> {
}
