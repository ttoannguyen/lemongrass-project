package com.ttoannguyen.lemongrass.configuration;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.enums.ERole;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Slf4j
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;
    @Bean
    ApplicationRunner applicationRunner(AccountRepository accountRepository){
        return args -> {
            if (!accountRepository.existsByUsername("admin")) {
                HashSet<String> roles = new HashSet<>();
                roles.add(ERole.ADMIN.name());
                Account account = Account.builder()
                        .username("admin")
                        .email("admin@gmail.com")
                        .firstName("Toan")
                        .lastName("Nguyen")
                        .roles(roles)
                        .password(passwordEncoder.encode("admin"))
                        .build();
                accountRepository.save(account);

                log.warn("admin account have been created with default password: admin, please change it");
            }
        };
    }
}
