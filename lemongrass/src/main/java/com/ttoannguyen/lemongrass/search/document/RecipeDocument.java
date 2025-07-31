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
  @Builder.Default Boolean isDeleted = false;
  @Builder.Default List<String> categoryIds = new ArrayList<>();
  //  @Builder.Default
  //  List<Tag> tags = new ArrayList<>();
  @Builder.Default List<Ingredient> ingredients = new ArrayList<>();
  @Builder.Default List<Instruction> instructions = new ArrayList<>();
  @Builder.Default List<Image> images = new ArrayList<>();

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
