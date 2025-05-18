package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.Request.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Response.AccountResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.enums.ERole;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.service.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;
    AccountMapper accountMapper;

    @Override
    public AccountResponse createAccount(AccountCreateRequest request) {
        if(accountRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);

        Account account = accountMapper.toAccount(request);

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        HashSet<String> roles = new HashSet<>();
        roles.add(ERole.USER.name());
        account.setRoles(roles);
        accountRepository.save(account);
        return accountMapper.toAccountResponse(account);
    }

    @Override
    public List<AccountResponse> getAccounts() {
        return accountRepository.findAll()
                .stream().map(accountMapper::toAccountResponse)
                .toList();
    }

    @Override
    public AccountResponse getAccount(String username) {
        Account account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new RuntimeException("USER_NOT_FOUND");
        }
        return accountMapper.toAccountResponse(account);
    }

    @Override
    public AccountResponse getMyInfo() {
        final var context = SecurityContextHolder.getContext();
        Account account = accountRepository.findByUsername(context.getAuthentication().getName());
        if (account == null)
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        return accountMapper.toAccountResponse(account);
    }
}
