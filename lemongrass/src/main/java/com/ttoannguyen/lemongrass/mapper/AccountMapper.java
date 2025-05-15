package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.dto.response.AccountResponse;
import com.ttoannguyen.lemongrass.entity.AccountEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = DefaultConfigMapper.class, uses = {RoleMapper.class})
public interface AccountMapper extends EntityMapper<AccountResponse, AccountEntity> {
    //    @Mapping(target = "roles", source = "roleIds")
    AccountEntity toEntity(AccountRequest dto);
}
