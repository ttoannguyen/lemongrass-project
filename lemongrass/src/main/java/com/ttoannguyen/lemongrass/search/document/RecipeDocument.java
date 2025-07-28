package com.ttoannguyen.lemongrass.search.document;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

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
  Boolean isDeleted = false;
  List<String> categoryIds = new ArrayList<>();
  List<Tag> tags = new ArrayList<>();
  List<Ingredient> ingredients = new ArrayList<>();
  List<Instruction> instructions = new ArrayList<>();
  List<Image> images = new ArrayList<>();

  Instant createdAt;
  Instant updatedAt;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @Builder
  public static class Tag {
    private String name;
  }

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
