package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, String> {
}
