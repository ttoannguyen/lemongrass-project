package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Request.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.PostResponse;
import com.ttoannguyen.lemongrass.entity.Post;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {AccountMapper.class, GroupMapper.class})
public interface PostMapper {

    Post toPost(PostCreateRequest request);

    PostResponse toPostResponse(Post post);
}
