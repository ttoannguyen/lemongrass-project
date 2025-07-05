package com.ttoannguyen.lemongrass.dto.Request.recipe;

import com.ttoannguyen.lemongrass.dto.Request.category.CategoryCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.instruction.InstructionCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.tag.TagCreationRequest;
import com.ttoannguyen.lemongrass.entity.Image;
import com.ttoannguyen.lemongrass.entity.enums.Difficulty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeCreationRequest {
  String title;
  Integer cookingTime;
  Difficulty difficulty;
  Integer servings;
  List<String> categoryIds;
  List<TagCreationRequest> tags;
  List<IngredientCreationRequest> ingredients;
  List<InstructionCreationRequest> instructions;
  List<ImageRequest> images;
}
