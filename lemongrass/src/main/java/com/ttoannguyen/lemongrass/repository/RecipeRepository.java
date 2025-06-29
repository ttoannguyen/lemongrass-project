package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Recipe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, String> {

  @EntityGraph(attributePaths = {"account"})
  List<Recipe> findAll();

  Optional<Recipe> findByTitle(String title);
}
