package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Response.post.ContentResponse;
import com.ttoannguyen.lemongrass.mapper.ContentMapper;
import com.ttoannguyen.lemongrass.repository.PostContentRepository;
import com.ttoannguyen.lemongrass.service.ContentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContentServiceImpl implements ContentService {
  PostContentRepository postContentRepository;
  ContentMapper contentMapper;

  @Override
  public List<ContentResponse> getContentPostId(String postId) {
    return contentMapper.toContentResponseList(postContentRepository.findByPostId(postId));
  }
}
