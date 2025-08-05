package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.fileDto.IngredientTemplateExcelDto;
import com.ttoannguyen.lemongrass.dto.fileDto.UnitExcelDto;
import org.apache.poi.ss.usermodel.Sheet;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ExcelImportService {
  List<UnitExcelDto> parseUnitsSheet(Sheet sheet);

  List<IngredientTemplateExcelDto> parseIngredientsSheet(Sheet sheet);

  void importExcel(MultipartFile file) throws IOException;
}
