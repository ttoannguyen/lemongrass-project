package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.PinnedPost;
import org.springframework.stereotype.Repository;

@Repository
public interface PinnedPostRepository extends JpaRepository<PinnedPost, String> {}
