package com.ttoannguyen.lemongrass.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttoannguyen.lemongrass.dto.Response.recipe.RecipeResponse;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.mapper.ingredientMapper.IngredientMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = {AccountMapper.class, IngredientMapper.class, InstructionMapper.class})
public interface RecipeMapper {
  ObjectMapper OBJECT_MAPPER = new ObjectMapper();

  @Mapping(source = "account", target = "account")
  @Mapping(source = "ingredients", target = "ingredients")
  @Mapping(source = "instructions", target = "instructions")
  @Mapping(source = "verified", target = "isVerified")
  @Mapping(source = "tags", target = "tags")
  @Mapping(source = "images", target = "images")
  RecipeResponse toRecipeResponse(Recipe recipe);

  @Named("jsonToList")
  static List<String> jsonToList(String tagsJson) {
    if (tagsJson == null || tagsJson.isEmpty()) return new ArrayList<>();
    try {
      return OBJECT_MAPPER.readValue(tagsJson, new TypeReference<List<String>>() {});
    } catch (Exception e) {
      return new ArrayList<>();
    }
  }

  List<RecipeResponse> toRecipeResponseList(List<Recipe> recipes);
}
