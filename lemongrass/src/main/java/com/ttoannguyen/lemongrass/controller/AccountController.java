package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.ApiResponse;
import com.ttoannguyen.lemongrass.dto.Request.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.AccountResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/_v1/accounts")
public interface AccountController {
    @PostMapping("/register")
    ApiResponse<AccountResponse> register(@Valid @RequestBody AccountCreateRequest request);

    @GetMapping()
    ApiResponse<List<AccountResponse>> getAccounts();

    @GetMapping("/{username}")
    ApiResponse<AccountResponse> getAccount(@Valid @PathVariable(name = "username") String username);
}
