package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, String> {
    AccountEntity findByUsername(String username);

    boolean existsByUsername();
}
