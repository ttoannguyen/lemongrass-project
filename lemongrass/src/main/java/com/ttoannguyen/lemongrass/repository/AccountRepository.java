package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Account;

public interface AccountRepository extends JpaRepository<Account, String> {
    boolean existsByUsername(String username);

    Account findByUsername(String username);
}
