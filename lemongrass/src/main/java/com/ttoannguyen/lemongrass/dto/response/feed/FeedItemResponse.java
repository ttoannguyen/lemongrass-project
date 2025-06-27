package com.ttoannguyen.lemongrass.dto.Response.feed;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountShortResponse;
import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.EXISTING_PROPERTY,
    property = "type",
    visible = true)
@JsonSubTypes({
  @JsonSubTypes.Type(value = PostFeedItemResponse.class, name = "POST"),
  @JsonSubTypes.Type(value = RecipeFeedItemResponse.class, name = "RECIPE")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class FeedItemResponse {
  String id;
  String type;
  LocalDateTime createAt;
  AccountShortResponse accountShortResponse;
  List<ImageResponse> imageResponses;
  Boolean isVerified;
}
