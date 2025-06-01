package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.PinnedPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PinnedPostRepository extends JpaRepository<PinnedPost, String> {
}
