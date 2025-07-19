package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.category.CategoryCreationRequest;
import com.ttoannguyen.lemongrass.dto.Request.category.CategoryRequest;
import com.ttoannguyen.lemongrass.dto.Response.category.CategoryResponse;
import com.ttoannguyen.lemongrass.entity.Category;
import com.ttoannguyen.lemongrass.entity.enums.CategoryType;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.CategoryMapper;
import com.ttoannguyen.lemongrass.repository.CategoryRepository;
import com.ttoannguyen.lemongrass.repository.RecipeRepository;
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
  RecipeRepository recipeRepository;

  @Override
  public List<CategoryResponse> getCategories() {
    return categoryMapper.toListCategoryResponse(categoryRepository.findAll());
  }

  @Override
  public CategoryResponse createCategory(CategoryCreationRequest categoryCreationRequest) {
    if (categoryRepository.existsByName(categoryCreationRequest.getName()))
      throw new AppException(ErrorCode.CATEGORY_EXISTED);
    Category category = categoryMapper.toCategory(categoryCreationRequest);
    category.setType(CategoryType.valueOf(categoryCreationRequest.getType()));
    return categoryMapper.toCategoryResponse(categoryRepository.save(category));
  }

  @Override
  public CategoryResponse getCategoryById(String id) {
    return categoryMapper.toCategoryResponse(
        categoryRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED)));
  }

  @Override
  public CategoryResponse updateCategory(CategoryRequest categoryRequest) {
    Category existingCategory =
        categoryRepository
            .findById(categoryRequest.getId())
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));

    if (!existingCategory.getName().equalsIgnoreCase(categoryRequest.getName())
        && categoryRepository.existsByName(categoryRequest.getName())) {
      throw new AppException(ErrorCode.CATEGORY_EXISTED);
    }

    existingCategory.setName(categoryRequest.getName());
    existingCategory.setType(CategoryType.valueOf(categoryRequest.getType()));

    Category updatedCategory = categoryRepository.save(existingCategory);

    return categoryMapper.toCategoryResponse(updatedCategory);
  }

  @Override
  public Void deleteCategory(String id) {
    Category category =
        categoryRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
    if (recipeRepository.existsByCategories_Id(id))
      throw new AppException(ErrorCode.CATEGORY_IN_USE);

    categoryRepository.delete(category);
    return null;
  }
}
