package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Request.post.PostCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.dto.Response.post.PostResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Group;
import com.ttoannguyen.lemongrass.entity.Post;
import com.ttoannguyen.lemongrass.entity.enums.Visibility;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(
    componentModel = "spring",
    uses = {AccountMapper.class, GroupMapper.class, RecipeMapper.class, ImageMapper.class})
public interface PostMapper {
  Post toPost(PostCreateRequest request);

  @Mapping(source = "account", target = "author")
  @Mapping(source = "group", target = "group")
  @Mapping(source = "recipe", target = "recipe")
  @Mapping(source = "approved", target = "isApproved")
  @Mapping(source = "visibility", target = "visibility", qualifiedByName = "visibilityToString")
  @Mapping(source = "images", target = "images")
  PostResponse toPostResponse(Post post);

  @Named("visibilityToString")
  default String visibilityToString(Visibility visibility) {
    return visibility != null ? visibility.name() : null;
  }

  List<PostResponse> toListPostResponse(List<Post> posts);
}
