package com.ttoannguyen.lemongrass.mapper.ingredientMapper;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientTemplateResponse;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;
import com.ttoannguyen.lemongrass.entity.IngredientTemplate;
import com.ttoannguyen.lemongrass.entity.IngredientUnit;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface IngredientTemplateMapper {

  IngredientTemplate toIngredientTemplate(IngredientTemplateCreateRequest request);

  @Mapping(
      source = "allowedUnits",
      target = "allowedUnits",
      qualifiedByName = "ingredientUnitToResponseList")
  IngredientTemplateResponse toIngredientTemplateResponse(IngredientTemplate ingredientTemplate);

  @Named("ingredientUnitToResponseList")
  static List<IngredientUnitResponse> ingredientUnitToResponseList(Set<IngredientUnit> units) {
    return units.stream()
        .map(
            unit ->
                IngredientUnitResponse.builder()
                    .id(unit.getId())
                    .name(unit.getName())
                    .minValue(unit.getMinValue())
                    .stepSize(unit.getStepSize())
                    .createdBy(unit.getCreatedBy())
                    .lastModifiedBy(unit.getLastModifiedBy())
                    .createdDate(unit.getCreatedDate())
                    .lastModifiedDate(unit.getLastModifiedDate())
                    .build())
        .collect(Collectors.toList());
  }

  List<IngredientTemplateResponse> toListIngredientTemplateResponse(
      List<IngredientTemplate> ingredientTemplates);
}
