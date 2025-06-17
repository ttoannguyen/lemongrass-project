package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import org.springframework.web.bind.annotation.*;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;

import java.util.List;

@RequestMapping("/api/_v1/posts")
public interface PostController {
    @PostMapping
    ApiResponse<PostResponse> create(@RequestBody PostCreateRequest postRequest);

    @GetMapping
    ApiResponse<List<PostResponse>> getPosts();

    @GetMapping("/post")
    ApiResponse<PostResponse> getPost(@RequestParam("postId") String postId);
}
