package com.ttoannguyen.lemongrass.dto.Response.notification;

import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationMessage {
  String id;
  AccountResponse sender;
  AccountResponse receiver;
  String message;
  String targetType;
  String targetId;
}
