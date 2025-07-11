package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.entity.SavedRecipe;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.RecipeMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.RecipeRepository;
import com.ttoannguyen.lemongrass.repository.SavedRecipeRepository;
import com.ttoannguyen.lemongrass.service.SavedRecipeService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SavedRecipeServiceImpl implements SavedRecipeService {
  SavedRecipeRepository savedRecipeRepository;
  AccountRepository accountRepository;
  RecipeRepository recipeRepository;
  RecipeMapper recipeMapper;

  @Override
  public boolean saveRecipe(String username, String recipeId) {
    log.info(username);
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    Recipe recipe =
        recipeRepository
            .findById(recipeId)
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));

    if (savedRecipeRepository.existsByAccountAndRecipe(account, recipe)) {
      return false;
    }

    try {
      SavedRecipe savedRecipe = SavedRecipe.builder().account(account).recipe(recipe).build();
      savedRecipeRepository.save(savedRecipe);
      return true;
    } catch (Exception e) {
      return false;
    }
  }

  @Override
  @Transactional
  public boolean unSaveRecipe(String username, String recipeId) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    Recipe recipe =
        recipeRepository
            .findById(recipeId)
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));

    try {
      savedRecipeRepository.deleteByAccountAndRecipe(account, recipe);
      log.info("Hello");
      return true;
    } catch (Exception e) {
      throw new RuntimeException(e);
      //      return false;
    }
  }

  @Override
  public boolean isSave(String username, String recipeId) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    Recipe recipe =
        recipeRepository
            .findById(recipeId)
            .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));

    return savedRecipeRepository.existsByAccountAndRecipe(account, recipe);
  }

  @Override
  public List<RecipeResponse> getSavedRecipes(String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    List<SavedRecipe> savedRecipes = savedRecipeRepository.findAllByAccount(account);
    return savedRecipes.stream().map(recipeMapper::savedRecipeToRecipeResponse).toList();
  }
}
