package com.ttoannguyen.lemongrass.security.service;

import com.ttoannguyen.lemongrass.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.dto.request.LoginRequest;
import com.ttoannguyen.lemongrass.dto.response.AccountResponse;
import com.ttoannguyen.lemongrass.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);

    AccountResponse register(AccountRequest userRequest);
}
