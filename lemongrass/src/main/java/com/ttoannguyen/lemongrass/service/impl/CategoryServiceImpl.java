package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.category.CategoryCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.category.CategoryResponse;
import com.ttoannguyen.lemongrass.entity.Category;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.CategoryMapper;
import com.ttoannguyen.lemongrass.repository.CategoryRepository;
import com.ttoannguyen.lemongrass.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryServiceImpl implements CategoryService {
  CategoryRepository categoryRepository;
  CategoryMapper categoryMapper;

  @Override
  public List<CategoryResponse> getCategories() {
    return categoryMapper.toListCategoryResponse(categoryRepository.findAll());
  }

  @Override
  public CategoryResponse createCategory(CategoryCreationRequest categoryCreationRequest) {
    if (categoryRepository.existsByName(categoryCreationRequest.getName()))
      throw new AppException(ErrorCode.CATEGORY_EXISTED);
    Category category = categoryMapper.toCategory(categoryCreationRequest);
    return categoryMapper.toCategoryResponse(categoryRepository.save(category));
  }

  @Override
  public CategoryResponse getCategoryById(String id) {
    return categoryMapper.toCategoryResponse(
        categoryRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)));
  }
}
