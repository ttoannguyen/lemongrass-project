package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Request.group.GroupCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.entity.Group;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GroupMapper {
    @Mapping(source = "account.id", target = "ownerId")
    GroupResponse toGroupResponse(Group group);

    @Mapping(target = "account", ignore = true)
    Group toGroup(GroupCreateRequest groupCreateRequest);

    List<GroupResponse> toListGroupResponse(List<Group> groups);
}
