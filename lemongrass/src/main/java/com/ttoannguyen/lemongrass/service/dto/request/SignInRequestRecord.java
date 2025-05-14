package com.ttoannguyen.lemongrass.service.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignInRequestRecord(
        @NotBlank
        @Email
        String username,
        @NotBlank
        @Email
        String password
) {
}
