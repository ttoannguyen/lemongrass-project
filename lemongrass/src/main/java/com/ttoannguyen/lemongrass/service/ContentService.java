package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Response.post.ContentResponse;
import com.ttoannguyen.lemongrass.entity.PostContent;

import java.util.List;

public interface ContentService {
  List<ContentResponse> getContentPostId(String postId);
}
