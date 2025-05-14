package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.config.JwtUtil;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.service.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.service.mapper.AccountMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    AccountRepository accountRepository;
    PasswordEncoder passwordEncoder;
    AccountMapper accountMapper;
    JwtUtil jwtUtil;

    public JwtResponseRecord register(AccountRequest request){
        if(accountRepository.existsByUsername(request.getUsername())){
            throw new IllegalArgumentException("Username already exists");
        }
    }
}
