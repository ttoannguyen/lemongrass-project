package com.ttoannguyen.lemongrass.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ttoannguyen.lemongrass.dto.Request.role.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.role.RoleResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;

@RequestMapping("/api/_v1/roles")
public interface RoleController {
    @PostMapping
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest request);

    @GetMapping
    ApiResponse<List<RoleResponse>> getRoles();

    @DeleteMapping("/{roleId}")
    ApiResponse<Void> deleteRoleById(@PathVariable(name = "roleId") String roleId);
}
