package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.post.ContentResponse;
import com.ttoannguyen.lemongrass.entity.PostContent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ContentMapper {
  @Mapping(source = "text", target = "text")
  @Mapping(source = "contentTitle", target = "contentTitle")
  @Mapping(source = "displayOrder", target = "displayOrder")
  @Mapping(source = "urlImage", target = "urlImage") // map cả list
  ContentResponse toResponse(PostContent content);

  List<ContentResponse> toContentResponseList(List<PostContent> contents);
}
