package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientTemplateResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/ingredient_template")
public interface IngredientTemplateController {
  @PostMapping
  ApiResponse<IngredientTemplateResponse> create(
      @RequestBody IngredientTemplateCreateRequest request);

  @GetMapping
  ApiResponse<List<IngredientTemplateResponse>> getIngredientTemplates();

  @GetMapping("/{id}")
  ApiResponse<IngredientTemplateResponse> getIngredientTemplateId(
      @PathVariable("id") String IngredientTemplateId);

  @PutMapping("/{id}")
  ApiResponse<IngredientTemplateResponse> update(
      @PathVariable("id") String id, @RequestBody IngredientTemplateUpdateRequest request);

  @DeleteMapping("/{id}")
  ApiResponse<Void> delete(@PathVariable("id") String id);
}
