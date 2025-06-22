package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientTemplateResponse;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;
import com.ttoannguyen.lemongrass.entity.IngredientTemplate;
import com.ttoannguyen.lemongrass.entity.IngredientUnit;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.ingredientMapper.IngredientTemplateMapper;
import com.ttoannguyen.lemongrass.repository.IngredientTemplateRepository;
import com.ttoannguyen.lemongrass.repository.IngredientUnitRepository;
import com.ttoannguyen.lemongrass.service.IngredientTemplateService;
import com.ttoannguyen.lemongrass.service.IngredientUnitService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IngredientTemplateServiceImpl implements IngredientTemplateService {
  IngredientTemplateRepository ingredientTemplateRepository;
  IngredientTemplateMapper ingredientTemplateMapper;
  IngredientUnitRepository ingredientUnitRepository;

  @Override
  public IngredientTemplateResponse create(IngredientTemplateCreateRequest request) {
    final boolean exists = ingredientTemplateRepository.existsByName(request.getName());
    if (exists) throw new AppException(ErrorCode.INGREDIENT_TEMPLATE_EXISTED);

    Set<IngredientUnit> allowedUnits =
        request.getAllowedUnitIds().stream()
            .map(
                id ->
                    ingredientUnitRepository
                        .findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_NOT_UNIT_EXISTED)))
            .collect(Collectors.toSet());

    IngredientTemplate ingredientTemplate = ingredientTemplateMapper.toIngredientTemplate(request);
    ingredientTemplate.setAllowedUnits(allowedUnits);

    return ingredientTemplateMapper.toIngredientTemplateResponse(
        ingredientTemplateRepository.save(ingredientTemplate));
  }
}
