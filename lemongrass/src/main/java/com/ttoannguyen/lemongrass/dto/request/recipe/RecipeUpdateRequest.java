package com.ttoannguyen.lemongrass.dto.Request.recipe;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.instruction.InstructionCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.tag.TagCreationRequest;
import com.ttoannguyen.lemongrass.entity.enums.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeUpdateRequest {
  private String id;
  private String title;
  private Integer cookingTime;
  private Difficulty difficulty;

  private String description;
  private Integer servings;
  private List<String> categoryIds;
  private List<TagCreationRequest> tags;
  private List<IngredientCreationRequest> ingredients;
  private List<InstructionCreationRequest> instructions;
  private List<ImageRequest> images;
}
