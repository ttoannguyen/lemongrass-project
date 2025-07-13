package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.CategoryController;
import com.ttoannguyen.lemongrass.dto.Request.category.CategoryCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.category.CategoryRequest;
import com.ttoannguyen.lemongrass.dto.Response.category.CategoryResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryControllerImpl implements CategoryController {
  CategoryService categoryService;

  @Override
  public ApiResponse<List<CategoryResponse>> getCategories() {
    return ApiResponse.<List<CategoryResponse>>builder()
        .result(categoryService.getCategories())
        .build();
  }

  @Override
  public ApiResponse<CategoryResponse> getCategoryId(String id) {
    return ApiResponse.<CategoryResponse>builder()
        .result(categoryService.getCategoryById(id))
        .build();
  }

  @Override
  public ApiResponse<CategoryResponse> createCategory(
      CategoryCreationRequest categoryCreationRequest) {
    return ApiResponse.<CategoryResponse>builder()
        .result(categoryService.createCategory(categoryCreationRequest))
        .build();
  }

  @Override
  public ApiResponse<CategoryResponse> updateCategory(CategoryRequest categoryRequest) {
    return ApiResponse.<CategoryResponse>builder()
        .result(categoryService.updateCategory(categoryRequest))
        .build();
  }
}
