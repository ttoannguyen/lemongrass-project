package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.AccountReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReportRepository extends JpaRepository<AccountReport, String> {
}
