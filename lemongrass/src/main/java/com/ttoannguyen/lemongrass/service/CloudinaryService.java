package com.ttoannguyen.lemongrass.service;

import com.cloudinary.Cloudinary;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {
  String uploadImage(MultipartFile file);
}
