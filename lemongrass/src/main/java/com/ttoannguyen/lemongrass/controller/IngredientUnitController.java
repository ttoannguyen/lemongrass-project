package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/_v1/units")
public interface IngredientUnitController {
  @PostMapping
  ApiResponse<IngredientUnitResponse> create(@RequestBody IngredientUnitCreateRequest request);
}
