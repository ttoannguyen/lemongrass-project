package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Post;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
  List<Post> findByAccountId(String accountId);
}
