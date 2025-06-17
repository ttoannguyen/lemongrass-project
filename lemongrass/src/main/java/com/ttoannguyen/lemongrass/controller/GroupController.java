package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.Request.group.GroupCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.group.GroupResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/groups")
public interface GroupController {

  @PostMapping
  ApiResponse<GroupResponse> create(@RequestBody GroupCreateRequest request);

  @GetMapping
  ApiResponse<List<GroupResponse>> getGroups();

  @GetMapping("/{groupId}")
  ApiResponse<GroupResponse> getGroupById(@PathVariable String groupId);

  @GetMapping("/name/{name}")
  ApiResponse<GroupResponse> getGroupByName(@PathVariable String name);
}
