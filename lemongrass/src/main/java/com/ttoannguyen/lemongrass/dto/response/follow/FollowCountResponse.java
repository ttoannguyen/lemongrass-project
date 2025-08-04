package com.ttoannguyen.lemongrass.dto.Response.follow;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FollowCountResponse {
  long followerCount;
  long followingCount;
}
