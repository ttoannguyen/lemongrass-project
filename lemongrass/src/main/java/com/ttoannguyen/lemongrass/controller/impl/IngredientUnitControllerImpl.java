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

import java.util.List;

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

  @Override
  public ApiResponse<List<IngredientUnitResponse>> getUnits() {
    return ApiResponse.<List<IngredientUnitResponse>>builder()
        .result(ingredientUnitService.getUnits())
        .build();
  }

  @Override
  public ApiResponse<IngredientUnitResponse> getUnitId(String id) {
    return ApiResponse.<IngredientUnitResponse>builder()
        .result(ingredientUnitService.getUnitId(id))
        .build();
  }
}
