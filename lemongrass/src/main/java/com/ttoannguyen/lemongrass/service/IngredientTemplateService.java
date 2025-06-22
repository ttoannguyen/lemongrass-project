package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientTemplateResponse;

public interface IngredientTemplateService {
  IngredientTemplateResponse create(IngredientTemplateCreateRequest request);
}
