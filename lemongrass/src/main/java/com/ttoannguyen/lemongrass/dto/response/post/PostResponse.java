package com.ttoannguyen.lemongrass.dto.Response.post;

import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
  String id;
  String title;
  String content;
  String visibility;
  boolean isApproved;
  List<ImageResponse> images;
  AccountResponse author;
  GroupResponse group;
  RecipeResponse recipe;
  String createdBy;
  String lastModifiedBy;
  LocalDateTime createdDate;
  LocalDateTime lastModifiedDate;
}
