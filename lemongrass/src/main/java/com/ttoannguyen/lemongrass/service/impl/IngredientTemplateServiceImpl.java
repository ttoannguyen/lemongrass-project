package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientTemplateResponse;
import com.ttoannguyen.lemongrass.entity.IngredientTemplate;
import com.ttoannguyen.lemongrass.entity.IngredientUnit;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.ingredientMapper.IngredientTemplateMapper;
import com.ttoannguyen.lemongrass.repository.IngredientRepository;
import com.ttoannguyen.lemongrass.repository.IngredientTemplateRepository;
import com.ttoannguyen.lemongrass.repository.IngredientUnitRepository;
import com.ttoannguyen.lemongrass.service.IngredientTemplateService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class IngredientTemplateServiceImpl implements IngredientTemplateService {
  IngredientTemplateRepository ingredientTemplateRepository;
  IngredientTemplateMapper ingredientTemplateMapper;
  IngredientUnitRepository ingredientUnitRepository;
  IngredientRepository ingredientRepository;

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
                        .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED)))
            .collect(Collectors.toSet());

    IngredientTemplate ingredientTemplate = ingredientTemplateMapper.toIngredientTemplate(request);
    ingredientTemplate.setAllowedUnits(allowedUnits);

    return ingredientTemplateMapper.toIngredientTemplateResponse(
        ingredientTemplateRepository.save(ingredientTemplate));
  }

  @Override
  public List<IngredientTemplateResponse> getIngredientTemplates() {

    List<IngredientTemplate> ingredientTemplates = ingredientTemplateRepository.findAll();

    return ingredientTemplateMapper.toListIngredientTemplateResponse(ingredientTemplates);
  }

  @Override
  public IngredientTemplateResponse getIngredientTemplateId(String id) {
    IngredientTemplate ingredientTemplate =
        ingredientTemplateRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED));
    return ingredientTemplateMapper.toIngredientTemplateResponse(ingredientTemplate);
  }

  @Override
  public IngredientTemplateResponse update(String id, IngredientTemplateUpdateRequest request) {
    IngredientTemplate ingredientTemplate =
        ingredientTemplateRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED));

    ingredientTemplate.setName(request.getName());
    ingredientTemplate.setAliases(request.getAliases());
    ingredientTemplate.setAllowedUnits(
        new HashSet<>(ingredientUnitRepository.findAllById(request.getAllowedUnitIds())));

    ingredientTemplate = ingredientTemplateRepository.save(ingredientTemplate);

    return ingredientTemplateMapper.toIngredientTemplateResponse(ingredientTemplate);
  }

  @Override
  public Void delete(String id) {
    // IngredientTemplate ingredientTemplate =
        ingredientTemplateRepository
            .findById(id)
            .orElseThrow(() -> new AppException(ErrorCode.INGREDIENT_TEMPLATE_NOT_EXISTED));

    if (ingredientRepository.existsByTemplate_IdAndRecipeIsNotNull(id)) {
      throw new AppException(ErrorCode.INGREDIENT_TEMPLATE_IN_USED);
    }

    ingredientTemplateRepository.deleteById(id);
    return null;
  }
}
