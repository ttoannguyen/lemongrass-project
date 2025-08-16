package com.ttoannguyen.lemongrass.dto.Request.post;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContentRequest {
  String text;
  String contentTitle;
  int displayOrder;
  MultipartFile file;
}
