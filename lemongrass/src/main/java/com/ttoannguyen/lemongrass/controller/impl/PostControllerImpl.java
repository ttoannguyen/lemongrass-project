package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.PostController;
import com.ttoannguyen.lemongrass.dto.Request.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.PostResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostControllerImpl implements PostController {
    PostService postService;
    @Override
    public ApiResponse<PostResponse> create(PostCreateRequest postRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ApiResponse.<PostResponse>builder()
                .result(postService.create(postRequest, username))
                .build();
    }

    @Override
    public ApiResponse<List<PostResponse>> getPosts() {
        return null;
    }

    @Override
    public ApiResponse<PostResponse> getPost(String postId) {
        return null;
    }
}
