package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.ContentResponse;
import com.ttoannguyen.lemongrass.dto.Response.post.PostContentResponse;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import com.ttoannguyen.lemongrass.entity.*;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.ContentMapper;
import com.ttoannguyen.lemongrass.mapper.PostMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.PostContentRepository;
import com.ttoannguyen.lemongrass.repository.PostRepository;
import com.ttoannguyen.lemongrass.service.CloudinaryService;
import com.ttoannguyen.lemongrass.service.ContentService;
import com.ttoannguyen.lemongrass.service.PostService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImpl implements PostService {
  PostRepository postRepository;
  AccountRepository accountRepository;
  PostMapper postMapper;
  CloudinaryService cloudinaryService;
  PostContentRepository postContentRepository;
  ContentMapper contentMapper;
  ContentService contentService;

  @Override
  @Transactional
  public PostResponse create(PostCreateRequest request, String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Post post =
        Post.builder()
            .title(request.getTitle())
            .visibility(request.getVisibility())
            .isApproved(false)
            .account(account)
            .group(null)
            .recipe(null)
            .commentCount(0)
            .build();

    List<PostContent> contents =
        request.getContents().stream()
            .map(
                (c) ->
                    PostContent.builder()
                        .text(c.getText())
                        .contentTitle(c.getContentTitle() != null ? c.getContentTitle() : null)
                        .displayOrder(c.getDisplayOrder())
                        .post(post)
                        .urlImage(
                            c.getFile() != null ? cloudinaryService.uploadImage(c.getFile()) : null)
                        .build())
            .collect(Collectors.toList());

    post.setContents(contents);
    Post savedPost = postRepository.save(post);
    return postMapper.toPostResponse(savedPost);
  }

  @Override
  public Page<PostResponse> getPosts(int page, int size) {
    PageRequest pageRequest = PageRequest.of(page, size);
    Page<Post> posts = postRepository.findAll(pageRequest);
    return posts.map(postMapper::toPostResponse);
  }

  @Override
  public Page<Post> searchPosts(String keyword, Pageable pageable) {
    return postRepository.findByTitleContainingIgnoreCase(keyword, pageable);
  }

  @Override
  public PostContentResponse getPost(String postId) {
    Post post =
        postRepository
            .findById(postId)
            .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED));

    List<ContentResponse> contentResponseList = contentService.getContentPostId(postId);
    PostContentResponse postResponse = postMapper.toPostContentResponse(post);
    postResponse.setContents(contentResponseList);
    return postResponse;
  }

  @Override
  public List<PostResponse> getAccountPosts(String accountId) {
    return postMapper.toListPostResponse(postRepository.findByAccountId(accountId));
  }

  private List<Image> uploadImages(List<ImageRequest> imageRequests, Post post) {
    return imageRequests.stream()
        .map(
            req -> {
              String url = cloudinaryService.uploadImage(req.getFile());
              return Image.builder()
                  .url(url)
                  .displayOrder(req.getDisplayOrder())
                  .post(post)
                  .build();
            })
        .collect(Collectors.toList());
  }
}
