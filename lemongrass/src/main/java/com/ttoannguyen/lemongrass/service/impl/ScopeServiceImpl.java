package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.ScopeDTO;
import com.ttoannguyen.lemongrass.entity.ScopeEntity;
import com.ttoannguyen.lemongrass.mapper.ScopeMapper;
import com.ttoannguyen.lemongrass.repository.ScopeRepository;
import com.ttoannguyen.lemongrass.service.ScopeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ScopeServiceImpl implements ScopeService {

    ScopeRepository scopeRepository;
    ScopeMapper scopeMapper;

    @Override
    public ScopeDTO createScope(ScopeDTO scopeDTO) {
        if (scopeRepository.findByName(scopeDTO.name()).isPresent()) {
            throw new RuntimeException("Scope already exists!");
        }
        ScopeEntity scope = scopeMapper.toEntity(scopeDTO);

        return scopeMapper.toDto(scopeRepository.save(scope));
    }

    @Override
    public ScopeDTO findByName(String name) {
        return scopeMapper.toDto(scopeRepository.findByName(name).orElseThrow(() -> new RuntimeException("Scope not found!")));
    }
}
