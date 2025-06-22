package com.ttoannguyen.lemongrass.dto.Request.ingredient;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientUnitCreateRequest {
  String name;
  Float minValue;
  Float stepSize;
}
