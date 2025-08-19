package com.ttoannguyen.lemongrass.dto.Response.notification;

import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponse {
  private String id;
  private AccountResponse sender;
  private AccountResponse receiver;
  private String message;
  private String targetId;
  private String targetType;
  private boolean isRead;
  private LocalDateTime createdDate;
}
