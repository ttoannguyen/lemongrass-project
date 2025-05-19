package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ttoannguyen.lemongrass.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {}
