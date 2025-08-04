package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.account.AccountShortResponse;
import org.mapstruct.*;

import com.ttoannguyen.lemongrass.dto.Request.account.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.account.AccountUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.entity.Account;

@Mapper(componentModel = "spring")
public interface AccountMapper {
  Account toAccount(AccountCreateRequest request);

  AccountResponse toAccountResponse(Account account);

  AccountShortResponse toAccountShortResponse(Account account);

  @Mapping(target = "roles", ignore = true)
  @Mapping(target = "profilePictureUrl", ignore = true)
  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  void updateAccount(@MappingTarget Account account, AccountUpdateRequest accountUpdateRequest);
}
