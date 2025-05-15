package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.RoleEntity;
import com.ttoannguyen.lemongrass.entity.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(ERole name);

    Optional<RoleEntity> findByName(String name);
}
