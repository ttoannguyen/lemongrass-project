package com.ttoannguyen.lemongrass.dto;

import com.ttoannguyen.lemongrass.entity.enums.NotificationType;
import com.ttoannguyen.lemongrass.entity.enums.Priority;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationDTO {
    String notificationId;
    String postId;
    String accountId;
    NotificationType type;
    String groupId;
    String content;
    String recipeId;
    boolean isRead;
    Priority priority;
}
