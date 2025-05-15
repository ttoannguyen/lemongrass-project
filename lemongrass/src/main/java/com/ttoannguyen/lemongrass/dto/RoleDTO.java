package com.ttoannguyen.lemongrass.dto;

import jakarta.validation.constraints.NotBlank;

public record RoleDTO(
        Long id,
        @NotBlank String name
) {
}
