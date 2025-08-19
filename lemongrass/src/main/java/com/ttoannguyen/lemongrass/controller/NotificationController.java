package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Response.notification.NotificationMessage;
import com.ttoannguyen.lemongrass.dto.Response.notification.NotificationResponse;
import com.ttoannguyen.lemongrass.entity.Notification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequestMapping("/api/_v1/notification")
public interface NotificationController {
  @GetMapping
  List<NotificationResponse> getUserNotifications();
}
