package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.AccountReport;
import org.springframework.stereotype.Repository;

@Repository
public interface UserReportRepository extends JpaRepository<AccountReport, String> {}
