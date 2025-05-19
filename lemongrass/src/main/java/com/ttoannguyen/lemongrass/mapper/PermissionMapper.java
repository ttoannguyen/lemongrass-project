package com.ttoannguyen.lemongrass.mapper;

import org.mapstruct.Mapper;

import com.ttoannguyen.lemongrass.dto.Request.PermissionRequest;
import com.ttoannguyen.lemongrass.dto.Response.PermissionResponse;
import com.ttoannguyen.lemongrass.entity.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
