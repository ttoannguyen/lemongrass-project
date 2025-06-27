package com.ttoannguyen.lemongrass.mapper;

import com.ttoannguyen.lemongrass.dto.Response.instruction.InstructionResponse;
import com.ttoannguyen.lemongrass.entity.Instruction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InstructionMapper {
  @Mapping(source = "images", target = "images")
  InstructionResponse toInstructionResponse(Instruction instruction);
}
