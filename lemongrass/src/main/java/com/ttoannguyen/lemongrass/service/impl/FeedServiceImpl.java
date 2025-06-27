package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Response.feed.FeedItemResponse;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.mapper.FeedMapper;
import com.ttoannguyen.lemongrass.repository.PostRepository;
import com.ttoannguyen.lemongrass.repository.RecipeRepository;
import com.ttoannguyen.lemongrass.service.FeedService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FeedServiceImpl implements FeedService {
  PostRepository postRepository;
  RecipeRepository recipeRepository;
  FeedMapper feedMapper;

  @Override
  public List<FeedItemResponse> getFeeds() {
    List<Post> posts = postRepository.findAll();
    List<Recipe> recipes = recipeRepository.findAll();

    List<FeedItemResponse> feedItemResponses = new ArrayList<>();

    posts.forEach(post -> feedItemResponses.add(feedMapper.toPostFeedItemResponse(post)));
    recipes.forEach(recipe -> feedItemResponses.add(feedMapper.toRecipeFeedItemResponse(recipe)));

    return feedItemResponses.stream()
        .sorted(Comparator.comparing(FeedItemResponse::getCreateAt).reversed())
        .collect(Collectors.toList());
  }
}
