package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.IngredientUnitController;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.IngredientUnitService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IngredientUnitControllerImpl implements IngredientUnitController {
  IngredientUnitService ingredientUnitService;

  @Override
  public ApiResponse<IngredientUnitResponse> create(IngredientUnitCreateRequest request) {
    return ApiResponse.<IngredientUnitResponse>builder()
        .result(ingredientUnitService.create(request))
        .build();
  }
}
