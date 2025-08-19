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

  // Lấy danh sách comment theo recipe_id, không bao gồm comment đã xóa
  List<Comment> findByRecipeIdAndStatusNot(String recipeId, CommentStatus status);

  // Lấy danh sách comment theo post_id, không bao gồm comment đã xóa
  List<Comment> findByPostIdAndStatusNot(String postId, CommentStatus status);

  // Lấy danh sách comment con (replies) theo parent_comment_id
  List<Comment> findByParentCommentIdAndStatusNot(String parentCommentId, CommentStatus status);

  List<Comment> findByRecipeIdAndStatusNotAndParentCommentIsNull(
      String recipeId, CommentStatus status);

  List<Comment> findByPostIdAndStatusNotAndParentCommentIsNull(String postId, CommentStatus status);

  //  List<Comment> findByParentCommentIdAndStatusNot(String parentCommentId, CommentStatus status);
}
