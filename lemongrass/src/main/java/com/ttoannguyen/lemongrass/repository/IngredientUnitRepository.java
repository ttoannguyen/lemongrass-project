package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.IngredientUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientUnitRepository extends JpaRepository<IngredientUnit, String> {
  Optional<IngredientUnit> findByName(String name);

  List<IngredientUnit> findAllByOrderByLastModifiedDateDesc();

  boolean existsByName(String name);

  boolean existsByNameAndIdNot(String name, String id);
}
