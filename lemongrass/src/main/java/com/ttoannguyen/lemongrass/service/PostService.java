package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;

import java.util.List;

public interface PostService {
  PostResponse create(PostCreateRequest request, String username);

  List<PostResponse> getPosts();

  PostResponse getPost(String postId);

  List<PostResponse> getAccountPosts(String accountId);
}
