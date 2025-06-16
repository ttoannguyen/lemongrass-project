package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.GroupEvent;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupEventRepository extends JpaRepository<GroupEvent, String> {}
