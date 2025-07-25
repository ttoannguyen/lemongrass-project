package com.ttoannguyen.lemongrass.service;

import java.util.List;

import com.ttoannguyen.lemongrass.dto.Request.role.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.role.RoleResponse;

public interface RoleService {
  RoleResponse crate(RoleRequest request);

  List<RoleResponse> getRoles();

  RoleResponse update(RoleRequest request, String username);

  void delete(String role);
}
