package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.service.dto.AccountResponseRecord;
import com.ttoannguyen.lemongrass.service.dto.request.AccountRequest;

public interface AccountService {
//    List<AccountDto> getAccounts();

    AccountResponseRecord register(AccountRequest request);

}
