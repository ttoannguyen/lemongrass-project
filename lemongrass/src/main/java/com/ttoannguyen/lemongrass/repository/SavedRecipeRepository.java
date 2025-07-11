package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.SavedRecipe;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedRecipeRepository extends JpaRepository<SavedRecipe, String> {
  boolean existsByAccountAndRecipe(Account account, Recipe recipe);

  void deleteByAccountAndRecipe(Account account, Recipe recipe);

  List<SavedRecipe> findAllByAccount(Account account);
}
