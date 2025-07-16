package com.ttoannguyen.lemongrass.dto.Request.ingredient;

import jakarta.validation.constraints.NotEmpty;
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

  @NotEmpty(message = "EMPTY_UNIT_LIST")
  List<String> allowedUnitIds;
}
