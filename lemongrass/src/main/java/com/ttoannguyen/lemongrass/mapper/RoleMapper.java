package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.RoleDTO;
import com.ttoannguyen.lemongrass.entity.RoleEntity;
import org.mapstruct.Mapper;


@Mapper(config = DefaultConfigMapper.class)
public interface RoleMapper extends EntityMapper<RoleDTO, RoleEntity> {
}
