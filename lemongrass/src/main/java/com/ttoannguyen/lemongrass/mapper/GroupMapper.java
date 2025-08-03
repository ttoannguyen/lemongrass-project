package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Request.group.GroupCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupJoinResponse;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.entity.Group;
import com.ttoannguyen.lemongrass.entity.GroupMembership;
import com.ttoannguyen.lemongrass.entity.enums.GroupRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupMapper {
  @Mapping(source = "account.id", target = "ownerId")
  GroupResponse toGroupResponse(Group group);

  @Mapping(target = "account", ignore = true)
  @Mapping(source = "name", target = "name")
  @Mapping(source = "description", target = "description")
  @Mapping(source = "category", target = "category")
  @Mapping(target = "coverImageUrl", ignore = true)
  @Mapping(source = "rules", target = "rules")
  @Mapping(source = "requirePostApproval", target = "requirePostApproval")
  @Mapping(source = "visibility", target = "visibility")
  Group toGroup(GroupCreateRequest groupCreateRequest);

  List<GroupResponse> toListGroupResponse(List<Group> groups);
}
