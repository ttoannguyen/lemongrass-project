package com.ttoannguyen.lemongrass.repository;

import jakarta.persistence.QueryHint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
  List<Post> findByAccountId(String accountId);

  Page<Post> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

  @Query(
      """
      SELECT p FROM Post p
      WHERE (:keyword IS NULL OR :keyword = '' OR LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')))
  """)
  Page<Post> findAllWithFilters(Pageable pageable, @Param("keyword") String keyword);

  //  Page<Post> fin
}
