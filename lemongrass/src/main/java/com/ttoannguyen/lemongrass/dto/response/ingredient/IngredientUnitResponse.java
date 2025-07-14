package com.ttoannguyen.lemongrass.dto.Response.ingredient;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

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
  String createdBy;
  String lastModifiedBy;
  LocalDateTime createdDate;
  LocalDateTime lastModifiedDate;
}
