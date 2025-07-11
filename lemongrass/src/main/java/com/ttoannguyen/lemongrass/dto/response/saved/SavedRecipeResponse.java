package com.ttoannguyen.lemongrass.dto.Response.saved;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavedRecipeResponse {
  String id;
  String recipe;
}
