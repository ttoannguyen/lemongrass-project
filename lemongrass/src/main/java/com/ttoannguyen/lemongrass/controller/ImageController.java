package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/_v1/images")
public interface ImageController {
  @PostMapping("/upload")
  ImageResponse upload(@RequestParam MultipartFile file);
}
