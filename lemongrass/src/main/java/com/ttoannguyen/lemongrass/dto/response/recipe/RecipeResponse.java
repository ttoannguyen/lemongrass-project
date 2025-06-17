package com.ttoannguyen.lemongrass.dto.Response.recipe;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientResponse;
import com.ttoannguyen.lemongrass.dto.Response.instruction.InstructionResponse;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
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
