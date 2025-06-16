package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.PostResponse;

public interface PostService {
    PostResponse create(PostCreateRequest request, String username);
}
