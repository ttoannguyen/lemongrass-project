package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.RoleDTO;
import com.ttoannguyen.lemongrass.entity.RoleEntity;
import com.ttoannguyen.lemongrass.entity.ScopeEntity;
import com.ttoannguyen.lemongrass.entity.enums.ERole;
import com.ttoannguyen.lemongrass.mapper.RoleMapper;
import com.ttoannguyen.lemongrass.repository.RoleRepository;
import com.ttoannguyen.lemongrass.repository.ScopeRepository;
import com.ttoannguyen.lemongrass.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.util.ClassUtils.isPresent;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final ScopeRepository scopeRepository;
    private final RoleMapper roleMapper;

    @Override
    public RoleDTO createRole(RoleDTO roleDTO) {
        if (roleRepository.findByName(roleDTO.name()).isPresent()) {
            throw new RuntimeException("Role already exists");
        }
        RoleEntity role = roleMapper.toEntity(roleDTO);

        if (roleDTO.scopeIds() != null) {
            List<ScopeEntity> scopeEntities = roleDTO.scopeIds().stream()
                    .map(scopeId -> scopeRepository
                            .findById(scopeId)
                            .orElseThrow(() -> new RuntimeException("Scope not found with Ids: " + scopeId)))
                    .toList();
            role.setScopes(scopeEntities);
        }

        return roleMapper.toDto(roleRepository.save(role));
    }

    @Override
    public RoleDTO findByName(String name) {
        return roleMapper.toDto(roleRepository
                .findByName(ERole.valueOf(name))
                .orElseThrow(() -> new RuntimeException("Role not found")));
    }
}
