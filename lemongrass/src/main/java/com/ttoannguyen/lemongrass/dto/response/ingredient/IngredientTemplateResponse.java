package com.ttoannguyen.lemongrass.dto.Response.ingredient;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientTemplateResponse {
  String id;
  String name;
  List<String> aliases;
  List<IngredientUnitResponse> allowedUnits;
  String createdBy;
  String lastModifiedBy;
  LocalDateTime createdDate;
  LocalDateTime lastModifiedDate;
}
