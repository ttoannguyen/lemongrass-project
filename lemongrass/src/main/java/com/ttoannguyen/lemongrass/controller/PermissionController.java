package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.ApiResponse;
import com.ttoannguyen.lemongrass.dto.Request.PermissionRequest;
import com.ttoannguyen.lemongrass.dto.Response.PermissionResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/permissions")
public interface PermissionController {
    @PostMapping
    ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest request);

    @GetMapping
    ApiResponse<List<PermissionResponse>> getPermissions();

    @DeleteMapping("/{permissionId}")
    ApiResponse<Void> deletePermissionById(@PathVariable(name = "permissionId") String permissionId);
}
