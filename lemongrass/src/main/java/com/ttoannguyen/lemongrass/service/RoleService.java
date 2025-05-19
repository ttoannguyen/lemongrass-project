package com.ttoannguyen.lemongrass.service;

import java.util.List;

import com.ttoannguyen.lemongrass.dto.Request.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.RoleResponse;

public interface RoleService {
    RoleResponse crate(RoleRequest request);

    List<RoleResponse> getRoles();

    void delete(String role);
}
