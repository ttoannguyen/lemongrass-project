package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.config.JwtUtil;
import com.ttoannguyen.lemongrass.entity.AccountEntity;
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
        if(accountRepository.existsByEmail(request.getEmail())){
            throw new IllegalArgumentException("Email already exists!");
        }

        AccountEntity entity = accountMapper.toEntity(request);
        entity.setPassword(passwordEncoder.encode(request.getPassword()));

        AccountEntity saveEntity = accountRepository.save(entity);

        String token = jwtUtil.generateToken(saveEntity.getUsername());

        return new JwtResponseRecord(token, accountMapper.toResponseDto(saveEntity));
    }
}
