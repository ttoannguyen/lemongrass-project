package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.InstructionResponse;
import com.ttoannguyen.lemongrass.entity.Instruction;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InstructionMapper {
    InstructionResponse toResponse(Instruction instruction);
}
