package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.ScopeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScopeRepository extends JpaRepository<ScopeEntity, Long> {
    Optional<ScopeEntity> findByName(String name);
}
