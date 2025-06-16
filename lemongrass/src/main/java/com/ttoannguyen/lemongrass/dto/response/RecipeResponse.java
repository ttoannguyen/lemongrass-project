package com.ttoannguyen.lemongrass.dto.Response;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Ingredient;
import com.ttoannguyen.lemongrass.entity.Instruction;
import com.ttoannguyen.lemongrass.entity.Recipe;
import jakarta.persistence.*;

import java.util.List;

public class RecipeResponse {
    String id;
    String title;
    Integer cookingTime;
    Recipe.Difficulty difficulty;
    Integer servings;
    Float ratingAvg;
    String category;
    String tags;
    boolean isVerified;
    Integer shareCount;
    AccountResponse account;
    private List<IngredientResponse> ingredients;
    private List<InstructionResponse> instructions;
}
