package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.RoleDTO;

public interface RoleService {
    RoleDTO createRole(RoleDTO roleDTO);
    RoleDTO findByName(String name);
}
