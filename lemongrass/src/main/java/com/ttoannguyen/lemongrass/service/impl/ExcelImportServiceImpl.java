package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.fileDto.IngredientTemplateExcelDto;
import com.ttoannguyen.lemongrass.dto.fileDto.UnitExcelDto;
import com.ttoannguyen.lemongrass.entity.IngredientTemplate;
import com.ttoannguyen.lemongrass.entity.IngredientUnit;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.IngredientTemplateRepository;
import com.ttoannguyen.lemongrass.repository.IngredientUnitRepository;
import com.ttoannguyen.lemongrass.service.ExcelImportService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExcelImportServiceImpl implements ExcelImportService {
  IngredientUnitRepository ingredientUnitRepository;

  IngredientTemplateRepository ingredientTemplateRepository;

  @Override
  public List<UnitExcelDto> parseUnitsSheet(Sheet sheet) {
    List<UnitExcelDto> unitExcel = new ArrayList<>();
    for (Row row : sheet) {
      if (row.getRowNum() == 0) continue;
      UnitExcelDto dto =
          UnitExcelDto.builder()
              .name(row.getCell(0).getStringCellValue())
              .minValue(row.getCell(1).getNumericCellValue())
              .stepSize(row.getCell(2).getNumericCellValue())
              .build();

      unitExcel.add(dto);
    }

    return unitExcel;
  }

  @Override
  public List<IngredientTemplateExcelDto> parseIngredientsSheet(Sheet sheet) {
    List<IngredientTemplateExcelDto> ingredientTemplateExcel = new ArrayList<>();
    for (Row row : sheet) {
      if (row.getRowNum() == 0) continue;
      IngredientTemplateExcelDto dto =
          IngredientTemplateExcelDto.builder()
              .name(row.getCell(0).getStringCellValue())
              .aliases(
                  Arrays.stream(row.getCell(1).getStringCellValue().split(","))
                      .map(String::trim)
                      .collect(Collectors.toList()))
              .allowedUnitNames(
                  Arrays.stream(row.getCell(2).getStringCellValue().split(","))
                      .map(String::trim)
                      .collect(Collectors.toList()))
              .build();

      ingredientTemplateExcel.add(dto);
    }
    return ingredientTemplateExcel;
  }

  @Override
  @Transactional
  public void importExcel(MultipartFile file) throws IOException {
    try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
      Sheet unitSheet = workbook.getSheet("Units");
      Sheet ingredientSheet = workbook.getSheet("Ingredients");

      List<UnitExcelDto> units = parseUnitsSheet(unitSheet);
      List<IngredientTemplateExcelDto> ingredients = parseIngredientsSheet(ingredientSheet);
      log.info(units.toString());
      log.info(ingredients.toString());
      for (UnitExcelDto unit : units) {
        ingredientUnitRepository
            .findByNameIgnoreCase(unit.getName())
            .orElseGet(
                () ->
                    ingredientUnitRepository.save(
                        IngredientUnit.builder()
                            .name(unit.getName())
                            .minValue((float) unit.getMinValue())
                            .stepSize((float) unit.getStepSize())
                            .build()));
      }
      for (IngredientTemplateExcelDto ingredientTemplate : ingredients) {
        Set<IngredientUnit> allowUnits =
            ingredientTemplate.getAllowedUnitNames().stream()
                .map(
                    name ->
                        ingredientUnitRepository
                            .findByNameIgnoreCase(name)
                            .orElseThrow(
                                () -> new AppException(ErrorCode.INGREDIENT_UNIT_NOT_EXISTED)))
                .collect(Collectors.toSet());

        ingredientTemplateRepository
            .findByNameIgnoreCase(ingredientTemplate.getName())
            .orElseGet(
                () ->
                    ingredientTemplateRepository.save(
                        IngredientTemplate.builder()
                            .name(ingredientTemplate.getName())
                            .aliases(ingredientTemplate.getAliases())
                            .allowedUnits(allowUnits)
                            .build()));

        log.info("✅ Imported Units & Ingredients successfully");
      }
    }
  }
}
