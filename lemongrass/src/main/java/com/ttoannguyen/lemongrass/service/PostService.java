package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.PostContentResponse;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import com.ttoannguyen.lemongrass.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
  PostResponse create(PostCreateRequest request, String username);

  //  List<PostResponse> getPosts();

  Page<PostResponse> getPosts(int page, int size);

  Page<Post> searchPosts(String keyword, Pageable pageable);

  PostContentResponse getPost(String postId);

  List<PostResponse> getAccountPosts(String accountId);
}
