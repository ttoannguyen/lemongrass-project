package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.IngredientTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientTemplateRepository extends JpaRepository<IngredientTemplate, String> {

  boolean existsByName(String name);

  Optional<IngredientTemplate> findByName(String name);

  Optional<IngredientTemplate> findByNameIgnoreCase(String name);
}
