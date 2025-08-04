package com.ttoannguyen.lemongrass.dto.Request.group;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.entity.enums.Visibility;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupCreateRequest {
  String name;
  String description;
  boolean requirePostApproval;
  Visibility visibility;
}
