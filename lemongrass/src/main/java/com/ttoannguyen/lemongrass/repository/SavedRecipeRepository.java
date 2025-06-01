package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.SavedRecipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedRecipeRepository extends JpaRepository<SavedRecipe, String> {
}
