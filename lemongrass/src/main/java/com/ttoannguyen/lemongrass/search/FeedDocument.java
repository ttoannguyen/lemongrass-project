package com.ttoannguyen.lemongrass.search;

import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.elasticsearch.annotations.CompletionField;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.core.suggest.Completion;

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

  String type;

  @CompletionField(maxInputLength = 100)
  Completion titleSuggest;

  String title;
  String content;

  String accountId;
  String accountName;

  String groupId;
  String recipeId;

  String category;
  List<String> tags;

  String difficulty;
  Integer cookingTime;
  Integer servings;
  Float ratingAvg;

  Boolean isVerified;
  Boolean isApproved;
  Integer shareCount;

  String visibility;
  Instant createdDate;
}
