package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.tags.TagResponse;
import com.ttoannguyen.lemongrass.entity.Tag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagMapper {
  TagResponse toTagResponse(Tag tag);
}
