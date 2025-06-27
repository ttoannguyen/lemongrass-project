package com.ttoannguyen.lemongrass.dto.Request.ingredient;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientCreationRequest {
  String templateId; // ID của IngredientTemplate
  String unitId; // ID của IngredientUnit
  Float quantity;
  String note;
  Integer orderIndex;
}
