package com.ttoannguyen.lemongrass.service;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;

import com.ttoannguyen.lemongrass.dto.Request.account.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.account.AccountUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import org.springframework.web.multipart.MultipartFile;

public interface AccountService {
  AccountResponse createAccount(AccountCreateRequest request);

  @PreAuthorize("hasRole('ADMIN')")
  List<AccountResponse> getAccounts();

  // @PostAuthorize("returnObject.username == authentication.name")
  AccountResponse getAccount(String accountId);

  AccountResponse getMyInfo();

  AccountResponse updateMyInfo(String username, AccountUpdateRequest request, MultipartFile avatar);

  AccountResponse updateAccount(String accountId, AccountUpdateRequest request);
}
