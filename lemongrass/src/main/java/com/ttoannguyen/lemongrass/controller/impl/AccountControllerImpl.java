package com.ttoannguyen.lemongrass.controller.impl;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import com.ttoannguyen.lemongrass.controller.AccountController;
import com.ttoannguyen.lemongrass.dto.Request.account.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.account.AccountUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.AccountService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
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
    final var authentication = SecurityContextHolder.getContext().getAuthentication();
    log.info("Username {}", authentication.getName());
    authentication
        .getAuthorities()
        .forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));

    return ApiResponse.<List<AccountResponse>>builder()
        .result(accountService.getAccounts())
        .build();
  }

  @Override
  public ApiResponse<AccountResponse> getAccount(String accountId) {
    return ApiResponse.<AccountResponse>builder()
        .result(accountService.getAccount(accountId))
        .build();
  }

  @Override
  public ApiResponse<AccountResponse> getMyInfo() {
    return ApiResponse.<AccountResponse>builder().result(accountService.getMyInfo()).build();
  }

  @Override
  public ApiResponse<AccountResponse> updateMyInfo(
      AccountUpdateRequest request, MultipartFile avatar) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();

    return ApiResponse.<AccountResponse>builder()
        .result(accountService.updateMyInfo(username, request, avatar))
        .build();
  }

  @Override
  public ApiResponse<AccountResponse> updateAccount(
      String accountId, AccountUpdateRequest request) {
    return ApiResponse.<AccountResponse>builder()
        .result(accountService.updateAccount(accountId, request))
        .build();
  }
}
