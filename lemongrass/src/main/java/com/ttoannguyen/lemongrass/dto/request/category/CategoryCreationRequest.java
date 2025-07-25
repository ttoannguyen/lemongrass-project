package com.ttoannguyen.lemongrass.dto.Request.category;

import com.ttoannguyen.lemongrass.entity.enums.CategoryType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryCreationRequest {
  String name;
  String type;
}
