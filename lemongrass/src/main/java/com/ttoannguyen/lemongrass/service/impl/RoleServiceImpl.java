package com.ttoannguyen.lemongrass.service.impl;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.ttoannguyen.lemongrass.entity.Permission;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import org.springframework.stereotype.Service;

import com.ttoannguyen.lemongrass.dto.Request.role.RoleRequest;
import com.ttoannguyen.lemongrass.dto.Response.role.RoleResponse;
import com.ttoannguyen.lemongrass.mapper.RoleMapper;
import com.ttoannguyen.lemongrass.repository.PermissionRepository;
import com.ttoannguyen.lemongrass.repository.RoleRepository;
import com.ttoannguyen.lemongrass.service.RoleService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleServiceImpl implements RoleService {
  RoleRepository roleRepository;
  RoleMapper roleMapper;
  PermissionRepository permissionRepository;
  AccountRepository accountRepository;

  @Override
  public RoleResponse create(RoleRequest request) {
    var role = roleMapper.toRole(request);
    final var permissions = permissionRepository.findAllById(request.getPermissions());
    role.setPermissions(new HashSet<>(permissions));
    return roleMapper.toRoleResponse(roleRepository.save(role));
  }

  @Override
  public List<RoleResponse> getRoles() {
    return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
  }

  @Override
  public RoleResponse update(RoleRequest request, String username) {

    var existingRole =
        roleRepository
            .findById(request.getName())
            .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));

    existingRole.setDescription(request.getDescription());
    var allPermissions = permissionRepository.findAll();
    Map<String, Permission> permissionMap =
        allPermissions.stream().collect(Collectors.toMap(Permission::getName, p -> p));
    List<String> invalidPermissions =
        request.getPermissions().stream().filter(name -> !permissionMap.containsKey(name)).toList();

    if (!invalidPermissions.isEmpty()) {
      throw new AppException(ErrorCode.PERMISSION_NOT_VALID);
    }

    Set<Permission> selectedPermissions =
        request.getPermissions().stream().map(permissionMap::get).collect(Collectors.toSet());

    existingRole.setDescription(request.getDescription());
    existingRole.setPermissions(selectedPermissions);
    existingRole.setLastModifiedBy(username);
    existingRole.setLastModifiedDate(LocalDateTime.now());

    var saved = roleRepository.save(existingRole);
    return roleMapper.toRoleResponse(saved);
  }

  @Override
  public void delete(String roleName) {
    if (!roleRepository.existsById(roleName)) {
      throw new AppException(ErrorCode.ROLE_NOT_FOUND);
    }

    boolean isAssigned = accountRepository.existsByRoleName(roleName);
    if (isAssigned) {
      throw new AppException(ErrorCode.ROLE_IN_USED);
    }

    roleRepository.deleteById(roleName);
  }
}
