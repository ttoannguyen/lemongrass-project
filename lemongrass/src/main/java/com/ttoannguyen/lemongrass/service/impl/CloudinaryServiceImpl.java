package com.ttoannguyen.lemongrass.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import com.ttoannguyen.lemongrass.entity.Image;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.ImageRepository;
import com.ttoannguyen.lemongrass.service.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CloudinaryServiceImpl implements CloudinaryService {
  Cloudinary cloudinary;
  ImageRepository imageRepository;

  @Override
  public String uploadImage(MultipartFile file) {
    if (file == null || file.isEmpty()) {
      throw new AppException(ErrorCode.INVALID_FILE);
    }

    try {
      Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
      return (String) result.get("secure_url");
    } catch (IOException e) {
      log.error("Cloudinary upload failed: {}", e.getMessage(), e);
      throw new AppException(ErrorCode.FAILED_UPLOAD);
    }
  }

  @Override
  public ImageResponse uploadAndSave(MultipartFile file) {
    String url = uploadImage(file);
    Image image = imageRepository.save(Image.builder().url(url).build());
    return ImageResponse.builder().id(image.getId()).url(image.getUrl()).build();
  }
}
