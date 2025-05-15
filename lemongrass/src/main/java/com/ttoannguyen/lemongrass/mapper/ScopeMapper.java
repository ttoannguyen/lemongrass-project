package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.ScopeDTO;
import com.ttoannguyen.lemongrass.entity.ScopeEntity;
import org.mapstruct.Mapper;

@Mapper(config = DefaultConfigMapper.class)
public interface ScopeMapper extends EntityMapper<ScopeDTO, ScopeEntity> {
}
