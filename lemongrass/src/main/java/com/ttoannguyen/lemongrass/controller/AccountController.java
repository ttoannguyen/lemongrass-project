package com.ttoannguyen.lemongrass.controller;

import java.util.List;

import com.ttoannguyen.lemongrass.dto.Request.account.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.account.AccountUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import jakarta.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/_v1/accounts")
public interface AccountController {
  @PostMapping("/register")
  ApiResponse<AccountResponse> register(@Valid @RequestBody AccountCreateRequest request);

  @GetMapping()
  ApiResponse<List<AccountResponse>> getAccounts();

  @GetMapping("/{accountId}")
  ApiResponse<AccountResponse> getAccount(
      @Valid @PathVariable(name = "accountId") String accountId);

  @GetMapping("/username/{username}")
  ApiResponse<AccountResponse> getAccountByUsername(
      @PathVariable(name = "username") String username);

  @GetMapping("/myInfo")
  ApiResponse<AccountResponse> getMyInfo();

  @PutMapping(path = "/myInfo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  ApiResponse<AccountResponse> updateMyInfo(
      @ModelAttribute AccountUpdateRequest request,
      @RequestPart(value = "avatar", required = false) MultipartFile avatar);

  @PutMapping("/{accountId}")
  ApiResponse<AccountResponse> updateAccount(
      @PathVariable(value = "accountId") String accountId,
      @RequestBody AccountUpdateRequest request);
}
