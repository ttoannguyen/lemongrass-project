package com.ttoannguyen.lemongrass.dto;

import jakarta.validation.constraints.NotBlank;

public record ScopeDTO(
        Long id,
        @NotBlank String name
) {
}
