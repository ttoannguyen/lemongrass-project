package com.ttoannguyen.lemongrass.dto.Response.instruction;

import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InstructionResponse {
  String id;
  Integer stepNumber;
  String description;
  List<ImageResponse> images;
}
