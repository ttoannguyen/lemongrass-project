package com.ttoannguyen.lemongrass.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentDTO {
    String commentId;
    String postId;
    String accountId;
    String parentCommentId;
    String content;
}
