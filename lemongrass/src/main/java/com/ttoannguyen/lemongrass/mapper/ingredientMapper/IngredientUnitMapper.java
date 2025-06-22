package com.ttoannguyen.lemongrass.mapper.ingredientMapper;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientResponse;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;
import com.ttoannguyen.lemongrass.entity.IngredientUnit;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IngredientUnitMapper {
  IngredientUnit toIngredientUnit(IngredientUnitCreateRequest request);

  IngredientUnitResponse toIngredientUnitResponse(IngredientUnit ingredientUnit);
}
