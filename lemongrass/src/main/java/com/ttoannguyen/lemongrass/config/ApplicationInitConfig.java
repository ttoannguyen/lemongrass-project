package com.ttoannguyen.lemongrass.config;

import com.ttoannguyen.lemongrass.entity.AccountEntity;
import com.ttoannguyen.lemongrass.entity.RoleEntity;
import com.ttoannguyen.lemongrass.entity.enums.ERole;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class ApplicationInitConfig {

    private static final Logger log = LoggerFactory.getLogger(ApplicationInitConfig.class);

    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Bean
    ApplicationRunner applicationRunner(AccountRepository accountRepository) {
        return args -> {
            if (accountRepository.findByUsername("admin").isEmpty()) {
                RoleEntity adminRole = roleRepository.findByName(ERole.ADMIN)
                        .orElseGet(() -> {
                            RoleEntity role = RoleEntity.builder()
                                    .name(ERole.ADMIN)
                                    .build();
                            return roleRepository.save(role);
                        });

                AccountEntity account = AccountEntity.builder()
                        .username("admin")
                        .email("admin@example.com") // Thêm email bắt buộc
                        .password(passwordEncoder.encode("admin"))
                        .roles(List.of(adminRole)) // Gán danh sách RoleEntity
                        .build();

                accountRepository.save(account);

                log.warn("Admin user has been created with default password 'admin'. Please change it!");
            }
        };
    }
}