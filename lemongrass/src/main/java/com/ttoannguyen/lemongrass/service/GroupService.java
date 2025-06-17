package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.group.GroupCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;

import java.util.List;

public interface GroupService {
    GroupResponse create(GroupCreateRequest request, String username);

    List<GroupResponse> getGroups();

    GroupResponse getGroupByName(String name);

    GroupResponse getGroupById(String groupId);

}
