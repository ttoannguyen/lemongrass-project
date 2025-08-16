package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, String> {
  Optional<Rating> findByRecipeIdAndAccountId(String recipeId, String accountId);

  @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.recipe.id = :recipeId")
  Optional<Double> findAverageRatingByRecipeId(String recipeId);

  @Query("SELECT COUNT(r) FROM Rating r WHERE r.recipe.id = :recipeId")
  Optional<Long> findCountByRecipeId(String recipeId);
}
