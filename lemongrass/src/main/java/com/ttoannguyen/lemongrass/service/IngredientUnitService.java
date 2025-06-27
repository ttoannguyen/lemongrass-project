package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;

import java.util.List;

public interface IngredientUnitService {
  IngredientUnitResponse create(IngredientUnitCreateRequest request);

  List<IngredientUnitResponse> getUnits();

  IngredientUnitResponse getUnitId(String id);
}
