package com.ttoannguyen.lemongrass.dto.Request.ingredient;

import java.util.List;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientTemplateUpdateRequest {
  String name;
  List<String> aliases;
  List<String> allowedUnitIds;
}
