package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

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

  @Column(unique = true, nullable = false)
  String title;

  @Column(columnDefinition = "TEXT")
  String content;

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

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
  List<Image> images;
}
