package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.enums.CommentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Comment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {

  List<Comment> findByPostIdAndParentCommentIsNullAndStatusOrderByCreatedDateDesc(
      String postId, CommentStatus status);

  List<Comment> findByParentCommentIdAndStatusOrderByCreatedDateDesc(
      String parentCommentId, CommentStatus status);
}
