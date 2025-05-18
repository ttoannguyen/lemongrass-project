package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.ApiResponse;
import com.ttoannguyen.lemongrass.dto.Request.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.RoleResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/roles")
public interface RoleController {
    @PostMapping
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest request);

    @GetMapping
    ApiResponse<List<RoleResponse>> getPermissions();

    @DeleteMapping("/{roleId}")
    ApiResponse<Void> deletePermissionById(@PathVariable(name = "roleId") String permissionId);
}
