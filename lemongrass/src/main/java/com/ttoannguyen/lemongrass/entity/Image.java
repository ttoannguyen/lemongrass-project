package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "image")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Image {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", updatable = false, nullable = false)
  String id;

  @Column(nullable = false)
  String url;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "recipe_id")
  Recipe recipe;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "instruction_id")
  Instruction instruction;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id")
  Post post;

  Integer displayOrder;

  @ManyToOne
  @JoinColumn(name = "post_content_id")
  PostContent postContent;
}
