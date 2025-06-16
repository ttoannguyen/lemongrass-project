package com.ttoannguyen.lemongrass.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ttoannguyen.lemongrass.entity.RecipeReport;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeReportRepository extends JpaRepository<RecipeReport, String> {}
