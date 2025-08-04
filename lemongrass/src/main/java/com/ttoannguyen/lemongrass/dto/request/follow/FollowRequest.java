package com.ttoannguyen.lemongrass.dto.Request.follow;

import com.ttoannguyen.lemongrass.entity.enums.FollowTargetType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FollowRequest {
  String targetId;
  FollowTargetType type;
}
