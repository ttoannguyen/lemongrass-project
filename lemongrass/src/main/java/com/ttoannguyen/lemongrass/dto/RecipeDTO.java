package com.ttoannguyen.lemongrass.dto;

import com.ttoannguyen.lemongrass.entity.enums.Difficulty;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.AccessType;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeDTO {
     Integer recipeId;
     Integer userId;
     String title;
     Integer cookingTime;
     Difficulty difficulty;
     Integer servings;
     String category;
     List<String> tags;
     List<IngredientDTO> ingredients;
     List<InstructionDTO> instructions;
}
