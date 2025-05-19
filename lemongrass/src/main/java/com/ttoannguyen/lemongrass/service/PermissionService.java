package com.ttoannguyen.lemongrass.service;

import java.util.List;

import com.ttoannguyen.lemongrass.dto.Request.PermissionRequest;
import com.ttoannguyen.lemongrass.dto.Response.PermissionResponse;

public interface PermissionService {
    PermissionResponse createPermission(PermissionRequest request);

    List<PermissionResponse> getPermissions();

    void deleteById(String permissionId);
}
