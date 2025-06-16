package com.ttoannguyen.lemongrass.controller.impl;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.ttoannguyen.lemongrass.controller.RoleController;
import com.ttoannguyen.lemongrass.dto.Request.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.RoleResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.RoleService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleControllerImpl implements RoleController {
    RoleService roleService;

    @Override
    public ApiResponse<RoleResponse> create(RoleRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.crate(request))
                .build();
    }

    @Override
    public ApiResponse<List<RoleResponse>> getPermissions() {
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getRoles())
                .build();
    }

    @Override
    public ApiResponse<Void> deletePermissionById(String roleId) {
        roleService.delete(roleId);
        return ApiResponse.<Void>builder().build();
    }
}
