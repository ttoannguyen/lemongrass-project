package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Recipe;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, String> {

  Optional<Recipe> findByTitle(String title);

  List<Recipe> findAllByAccountId(String accountId);

  boolean existsByCategories_Id(String categoryId);

  //  boolean existsByTemplate_Id(String templateId);
}
