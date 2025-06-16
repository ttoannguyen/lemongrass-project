package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.RecipeVersion;
import org.springframework.stereotype.Repository;


@Repository
public interface RecipeVersionRepository extends JpaRepository<RecipeVersion, String> {}
