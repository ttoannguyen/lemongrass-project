package com.ttoannguyen.lemongrass.dto.Request.instruction;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import java.util.List;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageUpdateRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InstructionUpdateRequest {
  String id;
  Integer stepNumber;
  String description;
  List<ImageUpdateRequest> images;
}
