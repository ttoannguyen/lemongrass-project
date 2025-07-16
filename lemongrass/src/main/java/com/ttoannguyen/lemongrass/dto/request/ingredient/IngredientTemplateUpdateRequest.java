package com.ttoannguyen.lemongrass.dto.Request.ingredient;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
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

  @NotEmpty(message = "EMPTY_UNIT_LIST")
  List<String> allowedUnitIds;
}
