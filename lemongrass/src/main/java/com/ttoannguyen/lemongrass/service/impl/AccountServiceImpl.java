package com.ttoannguyen.lemongrass.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.ttoannguyen.lemongrass.service.CloudinaryService;
import jakarta.transaction.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ttoannguyen.lemongrass.dto.Request.account.AccountCreateRequest;
import com.ttoannguyen.lemongrass.dto.Request.account.AccountUpdateRequest;
import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
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
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountServiceImpl implements AccountService {

  AccountRepository accountRepository;
  AccountMapper accountMapper;
  PasswordEncoder passwordEncoder;
  RoleRepository roleRepository;

  CloudinaryService cloudinaryService;

  @Override
  public AccountResponse createAccount(AccountCreateRequest request) {
    if (accountRepository.existsByUsername(request.getUsername())) {
      throw new AppException(ErrorCode.USER_EXISTED);
    }

    Account account = accountMapper.toAccount(request);
    account.setPassword(passwordEncoder.encode(request.getPassword()));

    Role userRole =
        roleRepository
            .findById(ERole.REGISTERED.name())
            .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
    Set<Role> roles = new HashSet<>();
    roles.add(userRole);
    account.setRoles(roles);
    account.setProfilePictureUrl(
        "https://res.cloudinary.com/didxuklgy/image/upload/v1753470567/user_jc8xbq.png");

    return accountMapper.toAccountResponse(accountRepository.save(account));
  }

  @Override
  public List<AccountResponse> getAccounts() {
    return accountRepository.findAll().stream().map(accountMapper::toAccountResponse).toList();
  }

  @Override
  public AccountResponse getAccount(String accountId) {
    return accountMapper.toAccountResponse(
        accountRepository
            .findById(accountId)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
  }

  @Override
  public AccountResponse getAccountByUsername(String username) {
    return accountMapper.toAccountResponse(
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
  }

  @Override
  public AccountResponse getMyInfo() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    final var account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    return accountMapper.toAccountResponse(account);
  }

  @Override
  @Transactional
  public AccountResponse updateMyInfo(
      String username, AccountUpdateRequest request, MultipartFile avatar) {
    Account account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    accountMapper.updateAccount(account, request);

    if (request.getPassword() != null && !request.getPassword().isBlank()) {
      account.setPassword(passwordEncoder.encode(request.getPassword()));
    }
    if (avatar != null && !avatar.isEmpty()) {
      String url = cloudinaryService.uploadImage(avatar);
      account.setProfilePictureUrl(url);
    }
    return accountMapper.toAccountResponse(accountRepository.save(account));
  }

  @Override
  @PreAuthorize("hasRole('ADMIN')")
  public AccountResponse updateAccount(String accountId, AccountUpdateRequest request) {
    Account account =
        accountRepository
            .findById(accountId)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

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
