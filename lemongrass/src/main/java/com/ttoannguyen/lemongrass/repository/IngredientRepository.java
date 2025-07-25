package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, String> {
  boolean existsByTemplate_IdAndRecipeIsNotNull(String templateId);

  boolean existsByUnit_IdAndRecipeIsNotNull(String id);
}
