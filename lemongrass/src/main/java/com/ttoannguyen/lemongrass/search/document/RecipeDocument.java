package com.ttoannguyen.lemongrass.search.document;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RecipeDocument {
  String id;
  String title;
  Integer cookingTime;
  String difficulty;
  String description;
  Integer servings;
  String accountId;
  String accountName;
  Map<String, List<String>> highlight;
  Boolean isDeleted = false;
  List<String> categoryIds = new ArrayList<>();
  List<Ingredient> ingredients = new ArrayList<>();
  List<Instruction> instructions = new ArrayList<>();
  List<Image> images = new ArrayList<>();
  Double ratingAvg;
  Integer ratingCount;
  String createdAt;
  String updatedAt;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Ingredient {
    private String name;
    private String quantity;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Instruction {
    private Integer step;
    private String description;
  }

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Image {
    private String url;
  }
}
