package com.ttoannguyen.lemongrass.dto.Response.feed;

import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientShortResponse;
import com.ttoannguyen.lemongrass.dto.Response.tags.TagResponse;
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
  String title;
  String category;
  String difficulty;
  Integer cookingTime;
  Integer servings;
  Float rating;
  List<TagResponse> tags;
  List<IngredientShortResponse> ingredientShortResponses;
}
