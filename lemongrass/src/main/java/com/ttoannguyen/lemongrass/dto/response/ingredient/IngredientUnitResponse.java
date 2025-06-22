package com.ttoannguyen.lemongrass.dto.Response.ingredient;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientUnitResponse {
  String id;
  String name;
  Float minValue;
  Float stepSize;
}
