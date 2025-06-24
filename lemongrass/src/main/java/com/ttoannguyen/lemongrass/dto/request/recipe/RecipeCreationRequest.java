package com.ttoannguyen.lemongrass.dto.Request.recipe;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientCreationRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeCreateRequest {
  String name;
  String description;
  String steps;
  List<IngredientCreationRequest> ingredients;
}
