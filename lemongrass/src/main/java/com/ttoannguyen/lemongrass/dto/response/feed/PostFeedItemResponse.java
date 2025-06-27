package com.ttoannguyen.lemongrass.dto.Response.feed;

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
  String title;
  String content;
  List<TagResponse> tags;
}
