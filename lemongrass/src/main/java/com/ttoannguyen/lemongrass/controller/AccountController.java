package com.ttoannguyen.lemongrass.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.dto.Request.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.AccountUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.AccountResponse;

@RequestMapping("/api/_v1/accounts")
public interface AccountController {
    @PostMapping("/register")
    ApiResponse<AccountResponse> register(@Valid @RequestBody AccountCreateRequest request);

    @GetMapping()
    ApiResponse<List<AccountResponse>> getAccounts();

    @GetMapping("/{accountId}")
    ApiResponse<AccountResponse> getAccount(@Valid @PathVariable(name = "accountId") String accountId);

    @GetMapping("/myInfo")
    ApiResponse<AccountResponse> getMyInfo();

    @PutMapping("/{accountId}")
    ApiResponse<AccountResponse> updateAccount(
            @PathVariable(value = "accountId") String accountId, @RequestBody AccountUpdateRequest request);
}
