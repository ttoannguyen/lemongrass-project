package com.ttoannguyen.lemongrass.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ttoannguyen.lemongrass.dto.Request.role.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.role.RoleResponse;
import com.ttoannguyen.lemongrass.entity.Role;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}
