package com.ttoannguyen.lemongrass.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.dto.Request.PermissionRequest;
import com.ttoannguyen.lemongrass.dto.Response.PermissionResponse;

@RequestMapping("/api/_v1/permissions")
public interface PermissionController {
    @PostMapping
    ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest request);

    @GetMapping
    ApiResponse<List<PermissionResponse>> getPermissions();

    @DeleteMapping("/{permissionId}")
    ApiResponse<Void> deletePermissionById(@PathVariable(name = "permissionId") String permissionId);
}
