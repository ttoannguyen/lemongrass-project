package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.dto.response.AccountResponse;
import com.ttoannguyen.lemongrass.entity.AccountEntity;
import com.ttoannguyen.lemongrass.entity.RoleEntity;
import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.RoleRepository;
import com.ttoannguyen.lemongrass.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper;

    @Override
    public AccountResponse registerUser(AccountRequest accountRequest) {
        if (accountRepository.findByUsername(accountRequest.username()).isPresent() ||
                accountRepository.findByEmail(accountRequest.email()).isPresent())
            throw new RuntimeException("User or email already exists!");
        AccountEntity account = accountMapper.toEntity(accountRequest);
        account.setPassword(passwordEncoder.encode(accountRequest.password()));

        List<RoleEntity> roles = accountRequest.roleIds().stream()
                .map(roleId -> roleRepository.findById(roleId).orElseThrow(() -> new RuntimeException("Role not found with Ids: " + roleId)))
                .toList();
        account.setRoles(roles);

        return accountMapper.toDto(accountRepository.save(account));
    }

    @Override
    public AccountResponse findByUsername(String username) {
        return accountMapper.toDto(accountRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Account not found with Username: " + username)));
    }
}
