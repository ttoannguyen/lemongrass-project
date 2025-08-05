package com.ttoannguyen.lemongrass.dto.fileDto;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientTemplateExcelDto {
  String name;
  List<String> aliases;
  List<String> allowedUnitNames;
}
