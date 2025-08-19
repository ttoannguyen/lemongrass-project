package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.NotificationController;
import com.ttoannguyen.lemongrass.dto.Response.notification.NotificationResponse;
import com.ttoannguyen.lemongrass.service.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class NotificationControllerImpl implements NotificationController {
  NotificationService notificationService;

  @Override
  public List<NotificationResponse> getUserNotifications() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return notificationService.getUserNotifications(username);
  }
}
