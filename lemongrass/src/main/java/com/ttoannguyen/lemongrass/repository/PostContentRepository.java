package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.PostContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostContentRepository extends JpaRepository<PostContent, String> {
  List<PostContent> findByPostId(String postId);
}
