package com.ttoannguyen.lemongrass.dto.Response.image;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImageResponse {
  String url;
  Integer displayOrder;
}
