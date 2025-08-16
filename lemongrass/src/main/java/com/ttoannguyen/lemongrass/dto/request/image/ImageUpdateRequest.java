package com.ttoannguyen.lemongrass.dto.Request.image;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ImageUpdateRequest {
  String id; // ID ảnh (nếu ảnh cũ)
  String previewUrl; // URL ảnh cũ
  MultipartFile file; // ảnh mới (nếu có)
  Integer displayOrder;
}
