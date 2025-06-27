package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.IngredientTemplateController;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientTemplateResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.IngredientTemplateService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IngredientTemplateControllerImpl implements IngredientTemplateController {

  IngredientTemplateService ingredientTemplateService;

  @Override
  public ApiResponse<IngredientTemplateResponse> create(IngredientTemplateCreateRequest request) {
    return ApiResponse.<IngredientTemplateResponse>builder()
        .result(ingredientTemplateService.create(request))
        .build();
  }

  @Override
  public ApiResponse<List<IngredientTemplateResponse>> getIngredientTemplates() {
    return ApiResponse.<List<IngredientTemplateResponse>>builder()
        .result(ingredientTemplateService.getIngredientTemplates())
        .build();
  }

  @Override
  public ApiResponse<IngredientTemplateResponse> getIngredientTemplateId(String id) {
    return ApiResponse.<IngredientTemplateResponse>builder()
        .result(ingredientTemplateService.getIngredientTemplateId(id))
        .build();
  }
}
