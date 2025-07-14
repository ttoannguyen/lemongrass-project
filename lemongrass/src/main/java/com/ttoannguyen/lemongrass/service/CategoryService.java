package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.category.CategoryCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.category.CategoryRequest;
import com.ttoannguyen.lemongrass.dto.Response.category.CategoryResponse;

import java.util.List;

public interface CategoryService {
  List<CategoryResponse> getCategories();

  CategoryResponse createCategory(CategoryCreationRequest categoryCreationRequest);

  CategoryResponse getCategoryById(String id);

  CategoryResponse updateCategory(CategoryRequest categoryRequest);

  Void deleteCategory(String id);
}
