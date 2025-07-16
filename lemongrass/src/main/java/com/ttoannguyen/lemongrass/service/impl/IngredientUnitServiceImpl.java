package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientUnitUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientUnitResponse;
import com.ttoannguyen.lemongrass.entity.IngredientUnit;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.ingredientMapper.IngredientUnitMapper;
import com.ttoannguyen.lemongrass.repository.IngredientRepository;
import com.ttoannguyen.lemongrass.repository.IngredientUnitRepository;
import com.ttoannguyen.lemongrass.service.IngredientUnitService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IngredientUnitServiceImpl implements IngredientUnitService {
  IngredientUnitRepository ingredientUnitRepository;
  IngredientUnitMapper ingredientUnitMapper;
  IngredientRepository ingredientRepository;

  @Override
  public IngredientUnitResponse create(IngredientUnitCreateRequest request) {
    boolean exists = ingredientUnitRepository.existsByName(request.getName());
    if (exists) {
      throw new AppException(ErrorCode.INGREDIENT_UNIT_EXISTED);
    }
    return ingredientUnitMapper.toIngredientUnitResponse(
        ingredientUnitRepository.save(ingredientUnitMapper.toIngredientUnit(request)));
  }

  @Override
  public List<IngredientUnitResponse> getUnits() {
    List<IngredientUnit> ingredientUnits =
        ingredientUnitRepository.findAllByOrderByLastModifiedDateDesc();
    return ingredientUnitMapper.toIngredientUnitResponseList(ingredientUnits);
  }

  @Override
  public IngredientUnitResponse getUnitId(String id) {
    IngredientUnit ingredientUnit =
        ingredientUnitRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED));

    return ingredientUnitMapper.toIngredientUnitResponse(ingredientUnit);
  }

  @Override
  public IngredientUnitResponse updateUnit(String id, IngredientUnitUpdateRequest request) {
    IngredientUnit existing =
        ingredientUnitRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED));

    if (ingredientUnitRepository.existsByNameAndIdNot(request.getName(), id)) {
      throw new AppException(ErrorCode.INGREDIENT_UNIT_NAME_EXISTED);
    }

    existing.setName(request.getName());
    existing.setMinValue(request.getMinValue());
    existing.setStepSize(request.getStepSize());

    IngredientUnit updated = ingredientUnitRepository.save(existing);
    return ingredientUnitMapper.toIngredientUnitResponse(updated);
  }

  @Override
  public Void deleteUnit(String id) {
    IngredientUnit ingredientUnit =
        ingredientUnitRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED));

    if (ingredientRepository.existsByTemplate_IdAndRecipeIsNotNull(id)) {
      throw new AppException(ErrorCode.INGREDIENT_UNIT_IN_USED);
    }

    ingredientUnitRepository.deleteById(id);
    return null;
  }
}
