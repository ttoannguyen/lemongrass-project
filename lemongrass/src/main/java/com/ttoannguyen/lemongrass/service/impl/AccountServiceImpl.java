package com.ttoannguyen.lemongrass.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ttoannguyen.lemongrass.dto.Request.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.AccountUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.AccountResponse;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Role;
import com.ttoannguyen.lemongrass.entity.enums.ERole;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.RoleRepository;
import com.ttoannguyen.lemongrass.service.AccountService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;
    AccountMapper accountMapper;
    PasswordEncoder passwordEncoder;
    RoleRepository roleRepository;

    @Override
    public AccountResponse createAccount(AccountCreateRequest request) {
        if (accountRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        Account account = accountMapper.toAccount(request);
        account.setPassword(passwordEncoder.encode(request.getPassword()));

        // Gán vai trò USER mặc định
        Role userRole = roleRepository
                .findById(ERole.REGISTERED.name())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        account.setRoles(roles);

        return accountMapper.toAccountResponse(accountRepository.save(account));
    }

    @Override
    public List<AccountResponse> getAccounts() {
        return accountRepository.findAll().stream()
                .map(accountMapper::toAccountResponse)
                .toList();
    }

    @Override
    public AccountResponse getAccount(String accountId) {
        return accountMapper.toAccountResponse(
                accountRepository.findById(accountId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }

    @Override
    public AccountResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        final var account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        return accountMapper.toAccountResponse(account);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public AccountResponse updateAccount(String accountId, AccountUpdateRequest request) {
        Account account =
                accountRepository.findById(accountId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        accountMapper.updateAccount(account, request);

        // Chỉ cập nhật mật khẩu nếu được cung cấp
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            account.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // Cập nhật vai trò nếu được cung cấp
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            List<Role> roles = roleRepository.findAllById(request.getRoles());
            if (roles.size() != request.getRoles().size()) {
                throw new AppException(ErrorCode.ROLE_NOT_FOUND);
            }
            account.setRoles(new HashSet<>(roles));
        }

        return accountMapper.toAccountResponse(accountRepository.save(account));
    }
}
