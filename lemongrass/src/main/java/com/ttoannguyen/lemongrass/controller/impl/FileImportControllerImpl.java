package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.FileImportController;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.ExcelImportService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileImportControllerImpl implements FileImportController {
  ExcelImportService excelImportService;

  @Override
  public ApiResponse<Void> importExcelFile(MultipartFile file) throws IOException {
    try {
      excelImportService.importExcel(file);
      return ApiResponse.<Void>builder().message("Imported successfully").build();
    } catch (Exception e) {
      return ApiResponse.<Void>builder().message("Import failed: " + e.getMessage()).build();
    }
  }
}
