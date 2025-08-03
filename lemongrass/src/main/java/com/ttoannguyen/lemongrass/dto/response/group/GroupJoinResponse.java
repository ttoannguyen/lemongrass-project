package com.ttoannguyen.lemongrass.dto.Response.group;

import com.ttoannguyen.lemongrass.entity.enums.GroupRole;
import com.ttoannguyen.lemongrass.entity.enums.MembershipStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupJoinResponse {
  String groupId;
  String groupName;
  GroupRole groupRole;
  MembershipStatus status;
  boolean isJoined;
  boolean isPendingApproval;
}
