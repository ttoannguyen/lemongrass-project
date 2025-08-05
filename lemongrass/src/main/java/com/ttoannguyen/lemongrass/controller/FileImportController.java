package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/api/_v1/import")
public interface FileImportController {
  @PostMapping("/excel")
  ApiResponse<Void> importExcelFile(@RequestParam("file") MultipartFile file) throws IOException;
}
