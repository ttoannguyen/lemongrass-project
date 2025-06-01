package com.ttoannguyen.lemongrass.dto;

import com.ttoannguyen.lemongrass.entity.enums.Visibility;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostDTO {
    String postId;
    String accountId;
    String groupId;
    String recipeId;
    String content;
    Visibility visibility;
}
