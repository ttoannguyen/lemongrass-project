package com.ttoannguyen.lemongrass.dto.Response.post;

import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContentResponse {
  String text;
  String contentTitle;
  String urlImage;
  int displayOrder;
}
