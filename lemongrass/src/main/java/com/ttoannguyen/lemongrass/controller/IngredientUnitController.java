package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/units")
public interface IngredientUnitController {
  @PostMapping
  ApiResponse<IngredientUnitResponse> create(@RequestBody IngredientUnitCreateRequest request);

  @GetMapping
  ApiResponse<List<IngredientUnitResponse>> getUnits();

  @GetMapping("/{id}")
  ApiResponse<IngredientUnitResponse> getUnitId(@PathVariable("id") String id);

  @PutMapping("/{id}")
  ApiResponse<IngredientUnitResponse> updateUnit(
      @PathVariable("id") String id, @RequestBody IngredientUnitUpdateRequest request);

  @DeleteMapping("/{id}")
  ApiResponse<Void> deleteUnit(@PathVariable("id") String id);
}
