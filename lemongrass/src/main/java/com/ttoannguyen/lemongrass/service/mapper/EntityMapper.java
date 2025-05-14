package com.ttoannguyen.lemongrass.service.mapper;

import org.mapstruct.*;

import java.util.List;

public interface EntityMapper<D, E> {
    E toEntity(D dto);

    D toDto(E entity);

    List<D> toDto(List<E> entities);

    List<E> toEntity(List<D> dtos);

    @Named(value = "update")
    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
            nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS
    )
    void update(D dto, @MappingTarget E entity);
}

