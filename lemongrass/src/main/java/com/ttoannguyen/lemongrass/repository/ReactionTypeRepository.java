package com.ttoannguyen.lemongrass.repository;

import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Reaction;
import org.springframework.stereotype.Repository;

@Repository
public interface ReactionTypeRepository extends JpaRepository<Reaction, String> {}
