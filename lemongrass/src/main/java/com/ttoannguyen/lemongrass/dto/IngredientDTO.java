package com.ttoannguyen.lemongrass.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IngredientDTO {
    String name;
    String quantity;
    String unit;
    Integer order;
}
