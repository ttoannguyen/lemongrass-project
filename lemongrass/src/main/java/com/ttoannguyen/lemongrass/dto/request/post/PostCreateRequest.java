package com.ttoannguyen.lemongrass.dto.Request.post;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.entity.Account;
import lombok.Data;

import java.util.List;

@Data
public class PostCreateRequest {
  String title;
  String content;
  String visibility;
  Account account;
  List<ImageRequest> images;
}
