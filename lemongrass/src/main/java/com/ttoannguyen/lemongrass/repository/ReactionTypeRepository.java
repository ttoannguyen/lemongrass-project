package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionTypeRepository extends JpaRepository<Reaction, String> {
}
