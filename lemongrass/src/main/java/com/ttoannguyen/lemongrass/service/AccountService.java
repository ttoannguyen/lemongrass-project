package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.Request.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.AccountResponse;

import java.util.List;


public interface AccountService {
    AccountResponse createAccount(AccountCreateRequest request);
    List<AccountResponse> getAccounts();
    AccountResponse getAccount(String username);
}
