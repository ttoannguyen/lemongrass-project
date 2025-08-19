package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.comment.CommentRequest;
import com.ttoannguyen.lemongrass.dto.Response.comment.CommentResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Comment;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.entity.enums.CommentStatus;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.CommentRepository;
import com.ttoannguyen.lemongrass.repository.PostRepository;
import com.ttoannguyen.lemongrass.repository.RecipeRepository;
import com.ttoannguyen.lemongrass.service.CommentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentServiceImpl implements CommentService {
  CommentRepository commentRepository;
  RecipeRepository recipeRepository;
  AccountRepository accountRepository;
  PostRepository postRepository;

  public CommentResponse createComment(CommentRequest createCommentDto, String currentUsername) {
    // Kiểm tra chỉ một trong recipeId hoặc postId được cung cấp
    if ((createCommentDto.getRecipeId() == null && createCommentDto.getPostId() == null)
        || (createCommentDto.getRecipeId() != null && createCommentDto.getPostId() != null)) {
      throw new IllegalArgumentException("Exactly one of recipeId or postId must be provided");
    }

    // Tìm account
    Account account =
        accountRepository
            .findByUsername(currentUsername)
            .orElseThrow(() -> new IllegalArgumentException("Account not found"));

    // Tạo comment
    Comment comment =
        Comment.builder()
            .account(account)
            .content(createCommentDto.getContent())
            .status(CommentStatus.PUBLISHED)
            .build();

    // Liên kết với Recipe hoặc Post
    if (createCommentDto.getRecipeId() != null) {
      Recipe recipe =
          recipeRepository
              .findById(createCommentDto.getRecipeId())
              .orElseThrow(() -> new IllegalArgumentException("Recipe not found"));
      comment.setRecipe(recipe);
    } else {
      Post post =
          postRepository
              .findById(createCommentDto.getPostId())
              .orElseThrow(() -> new IllegalArgumentException("Post not found"));
      comment.setPost(post);
    }

    // Nếu là reply
    if (createCommentDto.getParentCommentId() != null) {
      Comment parentComment =
          commentRepository
              .findById(createCommentDto.getParentCommentId())
              .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
      comment.setParentComment(parentComment);
    }

    // Lưu comment
    comment = commentRepository.save(comment);

    // Chuyển đổi sang CommentResponse
    return convertToCommentResponse(comment);
  }

  public List<CommentResponse> getCommentsByRecipeId(String recipeId) {
    List<Comment> comments =
        commentRepository.findByRecipeIdAndStatusNotAndParentCommentIsNull(
            recipeId, CommentStatus.DELETED);
    return comments.stream()
        .map(this::convertToCommentResponseWithReplies)
        .collect(Collectors.toList());
  }

  private void markCommentAndRepliesAsDeleted(Comment comment) {
    comment.setStatus(CommentStatus.DELETED);
    commentRepository.save(comment);

    List<Comment> replies =
        commentRepository.findByParentCommentIdAndStatusNot(comment.getId(), CommentStatus.DELETED);
    for (Comment reply : replies) {
      markCommentAndRepliesAsDeleted(reply);
    }
  }

  public void deleteComment(String commentId, String currentUsername) {
    Comment comment =
        commentRepository
            .findById(commentId)
            .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_EXISTED));

    if (!comment.getAccount().getUsername().equals(currentUsername)) {
      throw new AppException(ErrorCode.UNAUTHORIZED);
    }

    markCommentAndRepliesAsDeleted(comment);
  }

  public List<CommentResponse> getCommentsByPostId(String postId) {
    List<Comment> comments =
        commentRepository.findByPostIdAndStatusNotAndParentCommentIsNull(
            postId, CommentStatus.DELETED);
    return comments.stream()
        .map(this::convertToCommentResponseWithReplies)
        .collect(Collectors.toList());
  }

  private CommentResponse convertToCommentResponse(Comment comment) {
    return CommentResponse.builder()
        .id(comment.getId())
        .content(comment.getContent())
        .username(comment.getAccount().getUsername())
        .recipeId(comment.getRecipe() != null ? comment.getRecipe().getId() : null)
        .postId(comment.getPost() != null ? comment.getPost().getId() : null)
        .createdDate(comment.getCreatedDate())
        .replies(new ArrayList<>())
        .build();
  }

  private CommentResponse convertToCommentResponseWithReplies(Comment comment) {
    CommentResponse response = convertToCommentResponse(comment);
    List<Comment> replies =
        commentRepository.findByParentCommentIdAndStatusNot(comment.getId(), CommentStatus.DELETED);
    response.setReplies(
        replies.stream()
            .map(this::convertToCommentResponseWithReplies)
            .collect(Collectors.toList()));
    return response;
  }
}
