package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Request.category.CategoryCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.category.CategoryResponse;
import com.ttoannguyen.lemongrass.entity.Category;
import com.ttoannguyen.lemongrass.entity.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

  //  @Mapping(source = "recipes", target = "recipeId", qualifiedByName = "mapRecipesToIds")
  CategoryResponse toCategoryResponse(Category category);

  @Mapping(source = "name", target = "name")
  @Mapping(source = "type", target = "type")
  Category toCategory(CategoryCreationRequest categoryCreationRequest);

  List<CategoryResponse> toListCategoryResponse(List<Category> categories);

  @Named("mapRecipesToIds")
  static List<String> mapRecipesToIds(List<Recipe> recipes) {
    if (recipes == null) return null;
    return recipes.stream().map(Recipe::getId).collect(Collectors.toList());
  }
}
