package com.ttoannguyen.lemongrass.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.ttoannguyen.lemongrass.dto.Request.account.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.account.AccountUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    Account toAccount(AccountCreateRequest request);

    AccountResponse toAccountResponse(Account account);

    @Mapping(target = "roles", ignore = true)
    void updateAccount(@MappingTarget Account account, AccountUpdateRequest accountUpdateRequest);
}
