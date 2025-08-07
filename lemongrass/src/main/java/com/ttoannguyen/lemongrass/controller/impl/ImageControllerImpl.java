package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.ImageController;
import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageControllerImpl implements ImageController {

  @Override
  public ImageResponse upload(MultipartFile file) {
    return null;
  }
}
