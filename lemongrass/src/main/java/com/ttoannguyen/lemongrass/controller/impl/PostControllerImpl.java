package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.PostController;
import com.ttoannguyen.lemongrass.dto.PageResponse.PageResponse;
import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.PostContentResponse;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
  public ApiResponse<Page<PostResponse>> getPosts(int page, int size) {
    Page<PostResponse> postResponses = postService.getPosts(page, size);
    return ApiResponse.<Page<PostResponse>>builder().result(postResponses).build();
  }

  @Override
  public ApiResponse<PostContentResponse> getPost(String postId) {
    return ApiResponse.<PostContentResponse>builder().result(postService.getPost(postId)).build();
  }

  @Override
  public ApiResponse<List<PostResponse>> getAccountPosts(String id) {
    return ApiResponse.<List<PostResponse>>builder()
        .result(postService.getAccountPosts(id))
        .build();
  }
}
