package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.dto.response.AccountResponse;

public interface AccountService {
    AccountResponse registerUser(AccountRequest userRequest);
    AccountResponse findByUsername(String username);
}
