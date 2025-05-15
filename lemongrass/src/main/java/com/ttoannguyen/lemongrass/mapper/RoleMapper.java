package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.RoleDTO;
import com.ttoannguyen.lemongrass.entity.RoleEntity;
import com.ttoannguyen.lemongrass.entity.enums.ERole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;


@Mapper(config = DefaultConfigMapper.class, uses = {ScopeMapper.class})
public interface RoleMapper extends EntityMapper<RoleDTO, RoleEntity> {
    
    @Mapping(target = "name", source = "name", qualifiedByName = "stringToERole")
    @Mapping(target = "scopes", source = "scopeIds")
    RoleEntity toEntity(RoleDTO dto);

    @Mapping(target = "name", source = "name", qualifiedByName = "eRoleToString")
    @Mapping(target = "scopeIds", source = "scopes")
    RoleDTO toDto(RoleEntity entity);

    @Named("stringToERole")
    default ERole stringToERole(String name) {
        return ERole.valueOf(name);
    }

    @Named("eRoleToString")
    default String eRoleToString(ERole eRole) {
        return eRole.name();
    }
}
