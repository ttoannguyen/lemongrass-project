package com.ttoannguyen.lemongrass.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.dto.Request.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.RoleResponse;

@RequestMapping("/api/_v1/roles")
public interface RoleController {
    @PostMapping
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest request);

    @GetMapping
    ApiResponse<List<RoleResponse>> getPermissions();

    @DeleteMapping("/{roleId}")
    ApiResponse<Void> deletePermissionById(@PathVariable(name = "roleId") String permissionId);
}
