package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientTemplateResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/_v1/ingredient_template")
public interface IngredientTemplateController {
  @PostMapping
  ApiResponse<IngredientTemplateResponse> create(
      @RequestBody IngredientTemplateCreateRequest request);
}
