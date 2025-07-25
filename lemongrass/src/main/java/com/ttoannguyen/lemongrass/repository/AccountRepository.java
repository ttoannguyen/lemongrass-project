package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.Account;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
  boolean existsByUsername(String username);

  Optional<Account> findByUsername(String username);

  @Query("SELECT COUNT(a) > 0 FROM Account a JOIN a.roles r WHERE r.name = :roleName")
  boolean existsByRoleName(String roleName);
}
