package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.SystemLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemLogRepository extends JpaRepository<SystemLog, String> {
}
