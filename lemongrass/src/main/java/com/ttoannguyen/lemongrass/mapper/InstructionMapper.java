package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.instruction.InstructionResponse;
import com.ttoannguyen.lemongrass.entity.Instruction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InstructionMapper {
    InstructionResponse toInstructionResponse(Instruction instruction);
}