package com.ttoannguyen.lemongrass.dto.Response.recipe;

import com.ttoannguyen.lemongrass.dto.Response.account.AccountShortResponse;
import com.ttoannguyen.lemongrass.dto.Response.category.CategoryResponse;
import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientResponse;
import com.ttoannguyen.lemongrass.dto.Response.instruction.InstructionResponse;
import com.ttoannguyen.lemongrass.dto.Response.tags.TagResponse;
import com.ttoannguyen.lemongrass.entity.enums.Difficulty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeResponse {
  String id;
  String title;
  Integer cookingTime;
  Difficulty difficulty;
  Integer servings;
  Float ratingAvg;
  List<CategoryResponse> category;
  boolean isVerified;
  Integer shareCount;
  AccountShortResponse accountShortResponse;
  List<TagResponse> tags;
  List<ImageResponse> images;
  List<IngredientResponse> ingredients;
  List<InstructionResponse> instructions;

  String createdBy;
  String lastModifiedBy;
  LocalDateTime createdDate;
  LocalDateTime lastModifiedDate;
}
