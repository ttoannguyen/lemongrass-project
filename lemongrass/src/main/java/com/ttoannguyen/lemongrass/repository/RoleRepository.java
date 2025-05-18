package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
}
