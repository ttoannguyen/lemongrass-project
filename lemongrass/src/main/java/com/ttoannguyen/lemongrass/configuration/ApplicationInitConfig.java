package com.ttoannguyen.lemongrass.configuration;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.entity.Role;
import com.ttoannguyen.lemongrass.entity.enums.ERole;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.RoleRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableSpringDataWebSupport(
    pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {

  RoleRepository roleRepository;
  PasswordEncoder passwordEncoder;

  @Bean
  ApplicationRunner applicationRunner(AccountRepository accountRepository) {
    return args -> {
      // Initialize roles if they don't exist
      if (!roleRepository.existsById(ERole.ADMIN.name())) {
        Role adminRole = Role.builder().name(ERole.ADMIN.name()).build();
        roleRepository.save(adminRole);
        log.info("Admin role created");
      }

      // Create an admin account if it doesn't exist
      if (!accountRepository.existsByUsername("admin")) {
        Role adminRole =
            roleRepository
                .findById(ERole.ADMIN.name())
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION));

        Set<Role> roles = new HashSet<>();
        roles.add(adminRole);

        Account account =
            Account.builder()
                .username("admin")
                .email("admin@gmail.com")
                .firstName("Toan")
                .lastName("Nguyen")
                .roles(roles)
                .password(passwordEncoder.encode("admin"))
                .build();
        accountRepository.save(account);

        log.warn("Admin account created with default password. Please change it immediately.");
      }
    };
  }
}
