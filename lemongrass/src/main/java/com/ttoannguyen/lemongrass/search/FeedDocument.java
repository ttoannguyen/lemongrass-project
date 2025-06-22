package com.ttoannguyen.lemongrass.search;

import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.elasticsearch.annotations.Document;

import java.time.Instant;
import java.util.List;

@Document(indexName = "feed")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FeedDocument {
  @Id String id;
  String type; // "POST" or "RECIPE"

  String title;
  String content; // Only for posts

  String accountId;
  String accountName;

  String groupId; // Only for posts
  String recipeId; // If post references a recipe

  String category; // Only for recipes
  List<String> tags; // For recipe tags (parsed from JSON)

  String difficulty; // For recipes
  Integer cookingTime;
  Integer servings;
  Float ratingAvg;

  Boolean isVerified;
  Boolean isApproved;
  Integer shareCount;

  String visibility; // Only for posts: PUBLIC, PRIVATE...

  Instant createdDate;
}
