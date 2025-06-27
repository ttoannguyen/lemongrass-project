package com.ttoannguyen.lemongrass.dto.Request.instruction;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.entity.Image;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InstructionCreationRequest {
  Integer stepNumber;
  String description;
  List<ImageRequest> images;
}
