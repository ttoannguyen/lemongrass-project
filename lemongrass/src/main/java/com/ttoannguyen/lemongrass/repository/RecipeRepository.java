package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, String> {
}
