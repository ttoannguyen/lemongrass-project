package com.ttoannguyen.lemongrass.dto.Response.post;

import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import java.time.LocalDateTime;
import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostContentResponse {
  String id;
  String title;
  List<ContentResponse> contents;
  String visibility;
  boolean isApproved;
  String mainContents;

  AccountResponse author;
  GroupResponse group;
  RecipeResponse recipe;
  String createdBy;
  String lastModifiedBy;
  LocalDateTime createdDate;
  LocalDateTime lastModifiedDate;
}
