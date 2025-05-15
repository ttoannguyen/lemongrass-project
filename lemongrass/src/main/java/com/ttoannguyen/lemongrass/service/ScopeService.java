package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.ScopeDTO;

public interface ScopeService {
    ScopeDTO createScope(ScopeDTO scopeDTO);

    ScopeDTO findByName(String name);
}
