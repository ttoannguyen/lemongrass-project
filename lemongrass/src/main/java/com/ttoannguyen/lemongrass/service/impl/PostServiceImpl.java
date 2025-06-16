package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.AccountResponse;
import com.ttoannguyen.lemongrass.dto.Response.PostResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Group;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.PostMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.GroupRepository;
import com.ttoannguyen.lemongrass.repository.PostRepository;
import com.ttoannguyen.lemongrass.repository.RecipeRepository;
import com.ttoannguyen.lemongrass.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostServiceImpl implements PostService {
    PostRepository postRepository;
    AccountRepository accountRepository;
    GroupRepository groupRepository;
    RecipeRepository recipeRepository;
    PostMapper postMapper;
    @Override
    public PostResponse create(PostCreateRequest request, String username) {
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Group group = null;
        if(request.getGroupId() != null) {
            group = groupRepository.findById(request.getGroupId()).orElseThrow(() -> new AppException(ErrorCode.GROUP_NOT_EXISTED));
        }

        Recipe recipe = null;
        if(request.getRecipeId() != null){
            recipe = recipeRepository.findById(request.getRecipeId()).orElseThrow(() -> new AppException(ErrorCode.RECIPE_NOT_EXISTED));
        }

        Post post = postMapper.toPost(request);
        post.setAccount(account);
        post.setGroup(group);
        post.setRecipe(recipe);
        post.setApproved(false);

        return postMapper.toPostResponse(postRepository.save(post));
    }
}
