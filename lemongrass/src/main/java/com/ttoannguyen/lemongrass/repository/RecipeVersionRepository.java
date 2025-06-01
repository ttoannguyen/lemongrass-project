package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.RecipeVersion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeVersionRepository extends JpaRepository<RecipeVersion, String> {
}
