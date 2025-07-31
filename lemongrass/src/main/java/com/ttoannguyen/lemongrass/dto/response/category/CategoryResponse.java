package com.ttoannguyen.lemongrass.dto.Response.category;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
  String id;
  String name;
  String createdBy;
  String type;
  String lastModifiedBy;
  LocalDateTime createdDate;
  LocalDateTime lastModifiedDate;
}
