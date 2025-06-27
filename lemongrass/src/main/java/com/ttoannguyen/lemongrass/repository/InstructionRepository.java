package com.ttoannguyen.lemongrass.repository;

import com.ttoannguyen.lemongrass.entity.Instruction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructionRepository extends JpaRepository<Instruction, String> {}
