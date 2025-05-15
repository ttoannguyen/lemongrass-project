package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.RoleDTO;
import com.ttoannguyen.lemongrass.entity.RoleEntity;
import com.ttoannguyen.lemongrass.mapper.RoleMapper;
import com.ttoannguyen.lemongrass.repository.RoleRepository;
import com.ttoannguyen.lemongrass.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static org.springframework.util.ClassUtils.isPresent;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public RoleDTO createRole(RoleDTO roleDTO) {
        if (roleRepository.findByName(roleDTO.name()).isPresent()) {
            throw new RuntimeException("Role already exists");
        }
        RoleEntity role = roleMapper.toEntity(roleDTO);
        RoleEntity savedRole = roleRepository.save(role);

        return roleMapper.toDto(savedRole);
    }

    @Override
    public RoleDTO findByName(String name) {
        RoleEntity role = roleRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return roleMapper.toDto(role);
    }
}
