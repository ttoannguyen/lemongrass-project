package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.post.PostContentResponse;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.enums.Visibility;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = {
      AccountMapper.class,
      GroupMapper.class,
      RecipeMapper.class,
      ImageMapper.class,
      ContentMapper.class
    })
public interface PostMapper {
  Post toPost(PostCreateRequest request);

  @Mapping(source = "account", target = "author")
  @Mapping(source = "group", target = "group")
  @Mapping(source = "recipe", target = "recipe")
  @Mapping(source = "mainContents", target = "mainContents")
  //  @Mapping(target = "contents", ignore = true)
  @Mapping(source = "approved", target = "isApproved")
  @Mapping(source = "visibility", target = "visibility", qualifiedByName = "visibilityToString")
  @Mapping(source = "createdBy", target = "createdBy")
  @Mapping(source = "lastModifiedBy", target = "lastModifiedBy")
  @Mapping(source = "createdDate", target = "createdDate")
  @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
  PostResponse toPostResponse(Post post);

  @Mapping(source = "account", target = "author")
  @Mapping(source = "group", target = "group")
  @Mapping(source = "recipe", target = "recipe")
  @Mapping(target = "contents", ignore = true)
  @Mapping(source = "mainContents", target = "mainContents")
  @Mapping(source = "approved", target = "isApproved")
  @Mapping(source = "visibility", target = "visibility", qualifiedByName = "visibilityToString")
  @Mapping(source = "createdBy", target = "createdBy")
  @Mapping(source = "lastModifiedBy", target = "lastModifiedBy")
  @Mapping(source = "createdDate", target = "createdDate")
  @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
  PostContentResponse toPostContentResponse(Post post);

  //  Post

  @Named("visibilityToString")
  default String visibilityToString(Visibility visibility) {
    return visibility != null ? visibility.name() : null;
  }

  List<PostResponse> toListPostResponse(List<Post> posts);
}
