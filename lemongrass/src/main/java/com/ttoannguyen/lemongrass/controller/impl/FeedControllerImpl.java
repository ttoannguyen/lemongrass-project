package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.FeedController;
import com.ttoannguyen.lemongrass.dto.Response.feed.FeedItemResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.FeedService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FeedControllerImpl implements FeedController {
  FeedService feedService;

  @Override
  public ApiResponse<List<FeedItemResponse>> getFeeds() {
    return ApiResponse.<List<FeedItemResponse>>builder().result(feedService.getFeeds()).build();
  }
}
