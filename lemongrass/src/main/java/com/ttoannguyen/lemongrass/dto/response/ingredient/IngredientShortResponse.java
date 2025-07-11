package com.ttoannguyen.lemongrass.dto.Response.ingredient;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientShortResponse {
  String name;
  String quatity;
}
