package com.ttoannguyen.lemongrass.repository;


import com.ttoannguyen.lemongrass.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {

}
