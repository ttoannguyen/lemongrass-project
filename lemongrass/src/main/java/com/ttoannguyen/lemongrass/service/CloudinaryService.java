package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
  String uploadImage(MultipartFile file);

  ImageResponse uploadAndSave(MultipartFile file);
}
