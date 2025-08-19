package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Notification;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
  List<Notification> findByReceiver_IdOrderByCreatedDateDesc(String userId);
}
