package com.ttoannguyen.lemongrass.dto.Request.post;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.entity.Account;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostCreateRequest {
  String title;
  String mainContents;
  List<ContentRequest> contents;
  String visibility;
  Account account;
}
