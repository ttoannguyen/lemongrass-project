package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.group.GroupCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupJoinResponse;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;

import java.util.List;

public interface GroupService {
  GroupResponse create(GroupCreateRequest request, String username);

  List<GroupResponse> getGroups();

  GroupResponse getGroupByName(String name);

  List<GroupResponse> getGroupsByUsername(String username);

  GroupResponse getGroupById(String groupId);

  boolean checkJoin(String groupId, String username);

  GroupJoinResponse joinGroup(String groupId, String username);

  void leaveGroup(String groupId, String username);
}
