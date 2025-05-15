package com.ttoannguyen.lemongrass.controller;

import com.ttoannguyen.lemongrass.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.dto.request.LoginRequest;
import com.ttoannguyen.lemongrass.dto.response.AccountResponse;
import com.ttoannguyen.lemongrass.dto.response.LoginResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/auth")
public interface AuthController {
    @PostMapping("/login")
    ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request);

    @PostMapping("/register")
    ResponseEntity<AccountResponse> register(@Valid @RequestBody AccountRequest request);

}
