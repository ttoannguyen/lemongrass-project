package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "post_contents")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostContent {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  @Column(name = "content_title", length = 100)
  String contentTitle;

  @Column(columnDefinition = "TEXT", nullable = false)
  String text;

  @Column(name = "display_order")
  int displayOrder;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id", nullable = false)
  Post post;

  @Column(name = "url_image", length = 255)
  String urlImage;
}
