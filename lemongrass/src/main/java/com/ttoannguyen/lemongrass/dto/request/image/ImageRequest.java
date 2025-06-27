package com.ttoannguyen.lemongrass.dto.Request.image;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImageRequest {
  MultipartFile file;
  Integer displayOrder;
}
