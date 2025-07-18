package com.ttoannguyen.lemongrass.dto.Request.reaction;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReactionRequest {
  String targetId; // post
  String receiverId; // userPostId
  ReactionTargetType targetType;
  String username;
}
