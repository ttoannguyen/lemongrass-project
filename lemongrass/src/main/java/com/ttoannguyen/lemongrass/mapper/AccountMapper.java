package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Request.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.AccountResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface AccountMapper {
    Account toAccount(AccountCreateRequest request);

    AccountResponse toAccountResponse(Account account);
}
