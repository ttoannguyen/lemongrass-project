package com.ttoannguyen.lemongrass.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ttoannguyen.lemongrass.dto.Request.PermissionRequest;
import com.ttoannguyen.lemongrass.dto.Response.PermissionResponse;
import com.ttoannguyen.lemongrass.entity.Permission;
import com.ttoannguyen.lemongrass.mapper.PermissionMapper;
import com.ttoannguyen.lemongrass.repository.PermissionRepository;
import com.ttoannguyen.lemongrass.service.PermissionService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PermissionServiceImpl implements PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    @Override
    public PermissionResponse createPermission(PermissionRequest request) {
        Permission permission = permissionMapper.toPermission(request);
        return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
    }

    @Override
    public List<PermissionResponse> getPermissions() {
        final var permission = permissionRepository.findAll();
        return permission.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    @Override
    public void deleteById(String permissionId) {
        permissionRepository.deleteById(permissionId);
    }
}
