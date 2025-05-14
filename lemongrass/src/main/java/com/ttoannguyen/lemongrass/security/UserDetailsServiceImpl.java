package com.ttoannguyen.lemongrass.security;

import com.ttoannguyen.lemongrass.entity.AccountEntity;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;


/**
 * Authenticate a user from the database.
 */
@Slf4j
@Component("userDetailsSerivce")
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final AccountRepository accountRepository;
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        log.debug("Authentication {}", username);
        AccountEntity account = accountRepository.findByUsername(username);
        return User.builder()
                .username(account.getUsername())
                .password(account.getPassword())
                .authorities("USER")
                .build();
    }
}
