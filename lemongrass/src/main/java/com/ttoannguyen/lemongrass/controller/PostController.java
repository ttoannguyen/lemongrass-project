package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;

import java.util.List;

@RequestMapping("/api/_v1/posts")
public interface PostController {
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ApiResponse<PostResponse> create(@ModelAttribute PostCreateRequest postRequest);

  @GetMapping
  ApiResponse<List<PostResponse>> getPosts();

  @GetMapping("/{postId}")
  ApiResponse<PostResponse> getPost(@PathVariable("postId") String postId);
}
