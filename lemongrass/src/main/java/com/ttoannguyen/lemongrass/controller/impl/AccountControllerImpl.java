package com.ttoannguyen.lemongrass.controller.impl;

import com.ttoannguyen.lemongrass.controller.AccountController;
import com.ttoannguyen.lemongrass.dto.ApiResponse;
import com.ttoannguyen.lemongrass.dto.Request.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.AccountResponse;
import com.ttoannguyen.lemongrass.service.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountControllerImpl implements AccountController {
    AccountService accountService;
    @Override
    public ApiResponse<AccountResponse> register(AccountCreateRequest request) {
        return ApiResponse.<AccountResponse>builder()
                .result(accountService.createAccount(request))
                .build();
    }

    @Override
    public ApiResponse<List<AccountResponse>> getAccounts() {
        return ApiResponse.<List<AccountResponse>>builder()
                .result(accountService.getAccounts())
                .build();
    }

    @Override
    public ApiResponse<AccountResponse> getAccount(String username) {
        return ApiResponse.<AccountResponse>builder()
                .result(accountService.getAccount(username))
                .build();
    }
}
