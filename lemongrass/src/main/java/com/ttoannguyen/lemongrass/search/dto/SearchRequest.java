package com.ttoannguyen.lemongrass.search.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchRequest {
  private String keyword;
  private String field; // title, description, accountName, tags.name, ingredients.name,
  // instructions.description
  private List<String> categoryIds;
  private String difficulty;
  private boolean isAutocomplete;
}
