package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttoannguyen.lemongrass.entity.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {}
