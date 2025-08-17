package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "post")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post extends AbstractAuditingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  String id;

  @Column(columnDefinition = "TEXT", unique = true, nullable = false)
  String title;

  @Column(columnDefinition = "TEXT", unique = true, nullable = false)
  String mainContents;

  @OneToMany(
      mappedBy = "post",
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      fetch = FetchType.LAZY)
  @Builder.Default
  List<PostContent> contents = new ArrayList<>();

  @Column(nullable = false)
  String visibility;

  @Column(nullable = false)
  boolean isApproved;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "account_id")
  Account account;

  @ManyToOne
  @JoinColumn(name = "groups_id")
  Group group;

  @ManyToOne
  @JoinColumn(name = "recipe_id")
  Recipe recipe;

  @Column(name = "comment_count")
  int commentCount;

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
  @Builder.Default
  List<Comment> comments = new ArrayList<>();
}
