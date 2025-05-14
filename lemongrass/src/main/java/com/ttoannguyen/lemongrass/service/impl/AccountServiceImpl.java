package com.ttoannguyen.lemongrass.service.impl;

import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.service.AccountService;
import com.ttoannguyen.lemongrass.service.dto.AccountResponseRecord;
import com.ttoannguyen.lemongrass.service.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.service.mapper.AccountMapper;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;


@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountServiceImpl implements AccountService {
    AccountRepository accountRepository;
    AccountMapper accountMapper;

    @Override
    public AccountResponseRecord register(AccountRequest request) {
       final var entity = accountMapper.toEntity(request);
       return accountMapper.toResponseDto(accountRepository.save(entity));
    }

}
