package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import com.ttoannguyen.lemongrass.entity.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {
  ImageResponse toImageResponse(Image image);

  Image toImage(ImageResponse imageResponse);
}
