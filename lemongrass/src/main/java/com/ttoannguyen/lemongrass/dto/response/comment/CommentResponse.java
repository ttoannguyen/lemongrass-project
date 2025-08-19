package com.ttoannguyen.lemongrass.dto.Response.comment;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentResponse {
  String id;
  String content;
  String username;
  String recipeId;
  String postId;
  LocalDateTime createdDate;
  LocalDateTime updatedDate;
  List<CommentResponse> replies;
}
