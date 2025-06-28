package com.ttoannguyen.lemongrass.dto.Response.feed;

import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.Response.tags.TagResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostFeedItemResponse extends FeedItemResponse {
  String id;
  String title;
  String content;
  String visibility;
  boolean isApproved;
  AccountResponse author;
  GroupResponse group;
  RecipeResponse recipe;
}
