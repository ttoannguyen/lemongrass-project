package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.IngredientTemplate;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientTemplateRepository extends JpaRepository<IngredientTemplate, String> {

  boolean existsByName(String name);
}
