package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import com.ttoannguyen.lemongrass.entity.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ImageMapper {
  @Mapping(source = "id", target = "id")
  @Mapping(source = "url", target = "url")
  @Mapping(source = "displayOrder", target = "displayOrder")
  ImageResponse toResponse(Image image);

  List<ImageResponse> toResponseList(List<Image> images);

  Image toImage(ImageResponse imageResponse);
}
