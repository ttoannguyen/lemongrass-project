package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.PageResponse.PageResponse;
import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.PostContentResponse;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Post;
import jakarta.validation.constraints.Min;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;

import java.util.List;

@RequestMapping("/api/_v1/posts")
public interface PostController {
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ApiResponse<PostResponse> create(@ModelAttribute PostCreateRequest postRequest);

  @GetMapping
  ApiResponse<Page<PostResponse>> getPosts(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size);

  @GetMapping("/{postId}")
  ApiResponse<PostContentResponse> getPost(@PathVariable("postId") String postId);

  @GetMapping("/account/{accountId}")
  ApiResponse<List<PostResponse>> getAccountPosts(@PathVariable("accountId") String id);
}
