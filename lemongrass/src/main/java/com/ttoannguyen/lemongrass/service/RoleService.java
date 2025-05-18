package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.RoleResponse;

import java.util.List;

public interface RoleService {
    RoleResponse crate(RoleRequest request);

    List<RoleResponse> getRoles();

    void delete(String role);
}
