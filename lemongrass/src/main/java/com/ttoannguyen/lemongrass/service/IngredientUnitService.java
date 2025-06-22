package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;

public interface IngredientUnitService {
  IngredientUnitResponse create(IngredientUnitCreateRequest request);
}
