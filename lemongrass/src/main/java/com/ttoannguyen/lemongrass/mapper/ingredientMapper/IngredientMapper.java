package com.ttoannguyen.lemongrass.mapper.ingredientMapper;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientCreationRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientGetUpdateResponse;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientResponse;
import com.ttoannguyen.lemongrass.entity.Ingredient;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IngredientMapper {
  @Mapping(source = "template.name", target = "name")
  @Mapping(source = "orderIndex", target = "order")
  @Mapping(source = "unit.name", target = "unitName")
  @Mapping(source = "note", target = "note")
  IngredientResponse toIngredientResponse(Ingredient ingredient);

  @Mapping(source = "template.id", target = "templateId")
  @Mapping(source = "orderIndex", target = "order")
  @Mapping(source = "note", target = "note")
  @Mapping(source = "unit.id", target = "unitId")
  IngredientGetUpdateResponse toIngredientGetUpdateResponse(Ingredient ingredient);

  List<IngredientResponse> toListIngredientResponse(List<Ingredient> ingredients);

  Ingredient toIngredient(IngredientCreationRequest request);
}
