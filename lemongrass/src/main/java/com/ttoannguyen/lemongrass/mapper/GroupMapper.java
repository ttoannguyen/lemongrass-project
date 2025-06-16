package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.GroupResponse;
import com.ttoannguyen.lemongrass.entity.Group;

public interface GroupMapper {
    GroupResponse toGroupResponse(Group group);
}
