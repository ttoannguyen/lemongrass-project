package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.feed.PostFeedItemResponse;
import com.ttoannguyen.lemongrass.dto.Response.feed.RecipeFeedItemResponse;
import com.ttoannguyen.lemongrass.dto.Response.image.ImageResponse;
import com.ttoannguyen.lemongrass.entity.Image;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.Recipe;
import com.ttoannguyen.lemongrass.mapper.ingredientMapper.IngredientMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Comparator;
import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = {
      AccountMapper.class,
      //      TagMapper.class,
      IngredientMapper.class,
      GroupMapper.class,
      InstructionMapper.class,
      ImageMapper.class,
      CategoryMapper.class
    })
public interface FeedMapper {

  // Mapping Post → PostFeedItemResponse
  @Mapping(target = "type", constant = "POST")
  @Mapping(source = "id", target = "id")
  @Mapping(source = "createdDate", target = "createAt")
  @Mapping(source = "account", target = "accountShortResponse")
  @Mapping(source = "content", target = "content")
  @Mapping(source = "title", target = "title")
  @Mapping(source = "visibility", target = "visibility")
  @Mapping(source = "approved", target = "isApproved")
  @Mapping(source = "group", target = "group")
  @Mapping(source = "recipe", target = "recipe")
  @Mapping(source = "images", target = "imageResponses", qualifiedByName = "mapImageUrls")
  PostFeedItemResponse toPostFeedItemResponse(Post post);

  // Mapping Recipe → RecipeFeedItemResponse
  @Mapping(target = "type", constant = "RECIPE")
  @Mapping(source = "id", target = "id")
  @Mapping(source = "createdDate", target = "createAt")
  @Mapping(source = "title", target = "title")
  @Mapping(source = "categories", target = "category")
  @Mapping(source = "difficulty", target = "difficulty")
  @Mapping(source = "cookingTime", target = "cookingTime")
  @Mapping(source = "servings", target = "servings")
  @Mapping(source = "ratingAvg", target = "ratingAvg")
  @Mapping(source = "shareCount", target = "shareCount")
  //  @Mapping(source = "tags", target = "tags")
  @Mapping(source = "ingredients", target = "ingredients")
  @Mapping(source = "instructions", target = "instructions")
  @Mapping(source = "images", target = "imageResponses", qualifiedByName = "mapImageUrls")
  @Mapping(source = "account", target = "accountShortResponse")
  RecipeFeedItemResponse toRecipeFeedItemResponse(Recipe recipe);

  // Helper method để map và sắp xếp ảnh theo displayOrder
  @Named("mapImageUrls")
  default List<ImageResponse> mapImageUrls(List<Image> images) {
    if (images == null || images.isEmpty()) return List.of();
    return images.stream()
        .sorted(
            Comparator.comparing(
                image ->
                    image.getDisplayOrder() == null ? Integer.MAX_VALUE : image.getDisplayOrder()))
        .map(
            image ->
                ImageResponse.builder()
                    .url(image.getUrl())
                    .displayOrder(image.getDisplayOrder())
                    .build())
        .toList();
  }
}
