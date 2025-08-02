package com.ttoannguyen.lemongrass.repository;

import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Recipe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, String> {

  Optional<Recipe> findByTitle(String title);

  List<Recipe> findAllByAccountId(String accountId);

  boolean existsByCategories_Id(String categoryId);

  Optional<Recipe> findByIdAndIsDeletedFalse(String id);

  Optional<Recipe> findByTitleAndIsDeletedFalse(String title);

  List<Recipe> findAllByIsDeletedFalse();

  List<Recipe> findAllByAccountIdAndIsDeletedFalse(String accountId);

  @Query(
"""
  SELECT DISTINCT r FROM Recipe r
  LEFT JOIN r.categories c
  WHERE (:keyword IS NULL OR LOWER(r.title) LIKE LOWER(CONCAT('%', CAST(:keyword AS text), '%')))
    AND (:categoryIds IS NULL OR c.id IN :categoryIds)
    AND (:maxTime IS NULL OR r.cookingTime <= :maxTime)
""")
  Page<Recipe> findAllWithFilters(
      Pageable pageable,
      @Param("keyword") String keyword,
      @Param("categoryIds") List<String> categoryIds,
      @Param("maxTime") Integer maxTime);
}
