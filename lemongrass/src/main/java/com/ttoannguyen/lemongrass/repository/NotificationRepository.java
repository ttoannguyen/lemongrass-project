package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, String> {
}
