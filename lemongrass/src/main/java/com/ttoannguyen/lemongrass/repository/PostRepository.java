package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, String> {
}
