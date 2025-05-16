package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {
    boolean existsByUsername(String username);

    Account findByUsername(String username);
}
