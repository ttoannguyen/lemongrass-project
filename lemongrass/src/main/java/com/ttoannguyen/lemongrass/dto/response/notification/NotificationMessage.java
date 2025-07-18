package com.ttoannguyen.lemongrass.dto.Response.notification;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationMessage {
  String senderId;
  String receiverId;
  String message;
  String targetType;
  String targetId;
}
