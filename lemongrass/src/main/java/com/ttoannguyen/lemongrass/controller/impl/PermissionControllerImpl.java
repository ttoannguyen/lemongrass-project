package com.ttoannguyen.lemongrass.controller.impl;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.ttoannguyen.lemongrass.controller.PermissionController;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.dto.Request.PermissionRequest;
import com.ttoannguyen.lemongrass.dto.Response.PermissionResponse;
import com.ttoannguyen.lemongrass.service.PermissionService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionControllerImpl implements PermissionController {
    PermissionService permissionService;

    @Override
    public ApiResponse<PermissionResponse> create(PermissionRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.createPermission(request))
                .build();
    }

    @Override
    public ApiResponse<List<PermissionResponse>> getPermissions() {
        return ApiResponse.<List<PermissionResponse>>builder()
                .result(permissionService.getPermissions())
                .build();
    }

    @Override
    public ApiResponse<Void> deletePermissionById(String permissionId) {
        permissionService.deleteById(permissionId);
        return ApiResponse.<Void>builder().build();
    }
}
