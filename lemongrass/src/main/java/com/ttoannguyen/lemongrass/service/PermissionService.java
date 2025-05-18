package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.PermissionRequest;
import com.ttoannguyen.lemongrass.dto.Response.PermissionResponse;
import com.ttoannguyen.lemongrass.entity.Permission;

import java.util.List;

public interface PermissionService {
    PermissionResponse createPermission(PermissionRequest request);

    List<PermissionResponse> getPermissions();

    void deleteById(String permissionId);
}
