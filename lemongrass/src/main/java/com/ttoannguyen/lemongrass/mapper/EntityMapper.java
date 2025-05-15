package com.ttoannguyen.lemongrass.mapper;

import org.mapstruct.*;

import java.util.List;

public interface EntityMapper<D, E> {
    E toEntity(D dto);
    D toDto(E entity);
}

