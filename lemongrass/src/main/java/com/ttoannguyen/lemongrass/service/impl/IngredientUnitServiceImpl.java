package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;
import com.ttoannguyen.lemongrass.entity.IngredientUnit;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.ingredientMapper.IngredientUnitMapper;
import com.ttoannguyen.lemongrass.repository.IngredientUnitRepository;
import com.ttoannguyen.lemongrass.service.IngredientUnitService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IngredientUnitServiceImpl implements IngredientUnitService {
  IngredientUnitRepository ingredientUnitRepository;
  IngredientUnitMapper ingredientUnitMapper;

  @Override
  public IngredientUnitResponse create(IngredientUnitCreateRequest request) {
    boolean exists = ingredientUnitRepository.existsByName(request.getName());
    if (exists) {
      throw new AppException(ErrorCode.INGREDIENT_UNIT_EXISTED);
    }
    return ingredientUnitMapper.toIngredientUnitResponse(
        ingredientUnitRepository.save(ingredientUnitMapper.toIngredientUnit(request)));
  }
}
