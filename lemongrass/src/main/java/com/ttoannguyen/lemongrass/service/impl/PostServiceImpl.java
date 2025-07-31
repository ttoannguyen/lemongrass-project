package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import com.ttoannguyen.lemongrass.entity.*;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.PostMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.PostRepository;
import com.ttoannguyen.lemongrass.service.CloudinaryService;
import com.ttoannguyen.lemongrass.service.PostService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImpl implements PostService {
  PostRepository postRepository;
  AccountRepository accountRepository;
  // GroupRepository groupRepository;
  // RecipeRepository recipeRepository;
  PostMapper postMapper;
  // AccountMapper accountMapper;
  CloudinaryService cloudinaryService;

  //  @Override
  //  public PostResponse create(PostCreateRequest request, String username) {
  //    Account account =
  //        accountRepository
  //            .findByUsername(username)
  //            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
  //
  //    //        Group group = null;
  //
  //    //        if(request.getGroupId() != null) {
  //    //            group = groupRepository.findById(request.getGroupId()).orElseThrow(() -> new
  //    // AppException(ErrorCode.GROUP_NOT_EXISTED));
  //    //        }
  //    //
  //    //        Recipe recipe = null;
  //    //        if(request.getRecipeId() != null){
  //    //            recipe = recipeRepository.findById(request.getRecipeId()).orElseThrow(() ->
  // new
  //    // AppException(ErrorCode.RECIPE_NOT_EXISTED));
  //    //        }
  //
  //    Post post = postMapper.toPost(request);
  //    post.setAccount(account);
  //    //    post.setGroup(group);
  //    //    post.setRecipe(recipe);
  //    post.setApproved(false);
  //
  //    return postMapper.toPostResponse(postRepository.save(post));
  //  }
  @Override
  @Transactional
  public PostResponse create(PostCreateRequest request, String username) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    Group group = null;
    //    if (request.getGroupId() != null) {
    //        group = groupRepository.findById(request.getGroupId())
    //                .orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED));
    //    }

    Recipe recipe = null;
    //    if (request.getRecipeId() != null) {
    //        recipe = recipeRepository.findById(request.getRecipeId())
    //                .orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
    //
    //        recipe.setShareCount(recipe.getShareCount() + 1);
    //        recipeRepository.save(recipe);
    //    }

    Post post =
        Post.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .visibility(request.getVisibility())
            .isApproved(false)
            .account(account)
            .group(group)
            .recipe(recipe)
            .build();

    Post savedPost = postRepository.save(post);

    if (request.getImages() != null && !request.getImages().isEmpty()) {
      List<Image> images = uploadImages(request.getImages(), savedPost);
      savedPost.setImages(images);
      postRepository.save(savedPost); // update lại sau khi thêm images
    }

    return postMapper.toPostResponse(savedPost);
  }

  @Override
  public List<PostResponse> getPosts() {
    return postMapper.toListPostResponse(postRepository.findAll());
  }

  @Override
  public PostResponse getPost(String postId) {
    return postMapper.toPostResponse(
        postRepository
            .findById(postId)
            .orElseThrow(() -> new AppException(ErrorCode.POST_NOT_EXISTED)));
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
