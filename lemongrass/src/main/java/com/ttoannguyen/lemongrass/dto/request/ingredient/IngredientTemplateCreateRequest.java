package com.ttoannguyen.lemongrass.dto.Request.ingredient;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientTemplateCreateRequest {
  String name;
  List<String> aliases;
  List<String> allowedUnitIds;
}
