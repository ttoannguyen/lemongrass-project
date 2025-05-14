package com.ttoannguyen.lemongrass.service.mapper;

import com.ttoannguyen.lemongrass.entity.AccountEntity;
import com.ttoannguyen.lemongrass.service.dto.AccountResponseRecord;
import com.ttoannguyen.lemongrass.service.dto.request.AccountRequest;
import org.mapstruct.Mapper;

@Mapper(config = DefaultConfigMapper.class)
public interface AccountMapper extends EntityMapper<AccountRequest, AccountEntity>{
    // Ánh xạ từ AccountRequest sang AccountEntity (bao gồm password)
    AccountEntity toEntity(AccountRequest dto);

    // Ánh xạ từ AccountEntity sang AccountResponseRecord (bỏ qua password)
    AccountResponseRecord toResponseDto(AccountEntity entity);
}
