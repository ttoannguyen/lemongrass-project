package com.ttoannguyen.lemongrass.security.service.impl;

import com.ttoannguyen.lemongrass.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.dto.request.LoginRequest;
import com.ttoannguyen.lemongrass.dto.response.AccountResponse;
import com.ttoannguyen.lemongrass.dto.response.LoginResponse;
import com.ttoannguyen.lemongrass.entity.AccountEntity;
import com.ttoannguyen.lemongrass.security.JwtTokenProvider;
import com.ttoannguyen.lemongrass.security.service.AuthService;
import com.ttoannguyen.lemongrass.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final AccountService accountService;


    /**
     * @param request @{@link LoginRequest}
     * @return Message @{@link LoginResponse}
     */
    @Override
    public LoginResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
        AccountEntity accountEntity = (AccountEntity) authentication.getPrincipal();
        String token = jwtTokenProvider.generateToken(accountEntity);
        return new LoginResponse(
                token,
                accountEntity.getUsername(),
                accountEntity.getRoles().stream()
                        .map(role ->
                                role.getName()
                                        .name())
                        .collect(Collectors.toList())
        );
    }

    /**
     * @param userRequest @{@link AccountRequest}
     * @return Message @{@link AccountResponse}
     */
    public AccountResponse register(AccountRequest userRequest) {
        return accountService.registerUser(userRequest);
    }
}
