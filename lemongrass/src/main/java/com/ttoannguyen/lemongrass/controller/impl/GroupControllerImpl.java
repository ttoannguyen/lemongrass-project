package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.GroupController;
import com.ttoannguyen.lemongrass.dto.Request.group.GroupCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupJoinResponse;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.GroupService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GroupControllerImpl implements GroupController {
  GroupService groupService;

  @Override
  public ApiResponse<GroupResponse> create(GroupCreateRequest request) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<GroupResponse>builder()
        .result(groupService.create(request, username))
        .build();
  }

  @Override
  public ApiResponse<List<GroupResponse>> getGroups() {
    return ApiResponse.<List<GroupResponse>>builder().result(groupService.getGroups()).build();
  }

  @Override
  public ApiResponse<GroupResponse> getGroupById(String groupId) {
    return ApiResponse.<GroupResponse>builder().result(groupService.getGroupById(groupId)).build();
  }

  @Override
  public ApiResponse<GroupResponse> getGroupByName(String name) {
    return ApiResponse.<GroupResponse>builder().result(groupService.getGroupByName(name)).build();
  }

  @Override
  public ApiResponse<GroupJoinResponse> joinGroup(String groupId) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return ApiResponse.<GroupJoinResponse>builder()
        .result(groupService.joinGroup(groupId, username))
        .build();
  }

  @Override
  public ApiResponse<Void> leaveGroup(String groupId) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    groupService.leaveGroup(groupId, username);
    return ApiResponse.<Void>builder().message("Success").build();
  }
}
