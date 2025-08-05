package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.ingredient.IngredientTemplateUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.ingredient.IngredientTemplateResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IngredientTemplateService {
  IngredientTemplateResponse create(IngredientTemplateCreateRequest request);

  List<IngredientTemplateResponse> getIngredientTemplates();

  IngredientTemplateResponse getIngredientTemplateId(String id);

  IngredientTemplateResponse update(String id, IngredientTemplateUpdateRequest request);

  Void delete(String id);

  //  void importFromCSV(MultipartFile file);
}
