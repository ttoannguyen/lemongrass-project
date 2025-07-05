package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.category.CategoryCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.category.CategoryResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/categories")
public interface CategoryController {
  @GetMapping
  ApiResponse<List<CategoryResponse>> getCategories();

  @GetMapping("/{categoriesId}")
  ApiResponse<CategoryResponse> getCategoryId(@PathVariable("categoriesId") String id);

  @PostMapping
  ApiResponse<CategoryResponse> createCategory(
      @RequestBody CategoryCreationRequest categoryCreationRequest);
}
