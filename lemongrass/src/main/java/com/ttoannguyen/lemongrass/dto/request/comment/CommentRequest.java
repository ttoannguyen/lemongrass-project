package com.ttoannguyen.lemongrass.dto.Request.comment;

import com.ttoannguyen.lemongrass.entity.enums.CommentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentRequest {
  String postId;
  String recipeId;
  String accountId;
  String parentCommentId;
  String content;
  CommentStatus status;
}
