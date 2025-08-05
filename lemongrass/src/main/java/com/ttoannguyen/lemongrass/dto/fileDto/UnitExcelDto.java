package com.ttoannguyen.lemongrass.dto.fileDto;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UnitExcelDto {
  String name;
  double minValue;
  double stepSize;
}
