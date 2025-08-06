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
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
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
      if (row.getRowNum() == 0 || isRowEmpty(row)) continue;

      String name = getCellStringValue(row, 0);
      double minValue = getCellNumericValue(row, 1);
      double stepSize = getCellNumericValue(row, 2);

      log.info("Đơn vị: {}, minValue: {}, stepSize: {}", name, minValue, stepSize);

      unitExcel.add(
          UnitExcelDto.builder().name(name).minValue(minValue).stepSize(stepSize).build());
    }
    return unitExcel;
  }

  @Override
  public List<IngredientTemplateExcelDto> parseIngredientsSheet(Sheet sheet) {
    List<IngredientTemplateExcelDto> ingredientTemplateExcel = new ArrayList<>();
    for (Row row : sheet) {
      if (row.getRowNum() == 0 || isRowEmpty(row)) continue;

      String name = getCellStringValue(row, 0);
      String aliasStr = getCellStringValue(row, 1);
      String unitsStr = getCellStringValue(row, 2);

      log.info("Nguyên liệu: {}, aliases: {}, units: {}", name, aliasStr, unitsStr);

      List<String> aliases =
          Arrays.stream(aliasStr.split(","))
              .map(String::trim)
              .filter(s -> !s.isEmpty())
              .collect(Collectors.toList());

      List<String> allowedUnits =
          Arrays.stream(unitsStr.split(","))
              .map(String::trim)
              .filter(s -> !s.isEmpty())
              .collect(Collectors.toList());

      ingredientTemplateExcel.add(
          IngredientTemplateExcelDto.builder()
              .name(name)
              .aliases(aliases)
              .allowedUnitNames(allowedUnits)
              .build());
    }
    return ingredientTemplateExcel;
  }

  @Override
  @Transactional
  public void importExcel(MultipartFile file) throws IOException {
    try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
      Sheet unitSheet = workbook.getSheet("Units");
      Sheet ingredientSheet = workbook.getSheet("Ingredients");

      if (unitSheet == null || ingredientSheet == null) {
        throw new AppException(ErrorCode.INVALID_FILE_FORMAT);
      }

      List<UnitExcelDto> units = parseUnitsSheet(unitSheet);
      List<IngredientTemplateExcelDto> ingredients = parseIngredientsSheet(ingredientSheet);

      log.info("Parsed Units: {}", units);
      log.info("Parsed Ingredients: {}", ingredients);

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
      }

      log.info("✅ Imported Units & Ingredients successfully");
    }
  }

  private String getCellStringValue(Row row, int index) {
    Cell cell = row.getCell(index);
    if (cell == null) return "";
    return switch (cell.getCellType()) {
      case STRING -> cell.getStringCellValue().trim();
      case NUMERIC -> String.valueOf(cell.getNumericCellValue()).trim();
      case BOOLEAN -> String.valueOf(cell.getBooleanCellValue()).trim();
      case FORMULA -> cell.getCellFormula();
      default -> "";
    };
  }

  private double getCellNumericValue(Row row, int index) {
    Cell cell = row.getCell(index);
    if (cell == null) return 0.0;
    return switch (cell.getCellType()) {
      case NUMERIC -> cell.getNumericCellValue();
      case STRING -> {
        try {
          yield Double.parseDouble(cell.getStringCellValue());
        } catch (NumberFormatException e) {
          yield 0.0;
        }
      }
      default -> 0.0;
    };
  }

  private boolean isRowEmpty(Row row) {
    if (row == null) return true;
    for (int i = row.getFirstCellNum(); i < row.getLastCellNum(); i++) {
      Cell cell = row.getCell(i);
      if (cell != null && cell.getCellType() != CellType.BLANK) {
        return false;
      }
    }
    return true;
  }
}
