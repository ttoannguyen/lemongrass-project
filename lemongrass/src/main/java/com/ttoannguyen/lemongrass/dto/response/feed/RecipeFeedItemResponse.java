package com.ttoannguyen.lemongrass.dto.Response.feed;

import com.ttoannguyen.lemongrass.dto.Response.category.CategoryResponse;
import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientResponse;
import com.ttoannguyen.lemongrass.dto.Response.instruction.InstructionResponse;
import com.ttoannguyen.lemongrass.dto.Response.tags.TagResponse;
import com.ttoannguyen.lemongrass.entity.enums.Difficulty;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeFeedItemResponse extends FeedItemResponse {
  String id;
  String title;
  Integer cookingTime;
  Difficulty difficulty;
  Integer servings;
  Float ratingAvg;
  List<CategoryResponse> category;
  boolean isVerified;
  Integer shareCount;
  //  List<TagResponse> tags;
  List<ImageResponse> images;
  List<IngredientResponse> ingredients;
  List<InstructionResponse> instructions;
}
