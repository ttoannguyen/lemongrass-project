package com.ttoannguyen.lemongrass.service.dto;

public record AccountResponseRecord(
        String id,
        String username,
        String email,
        String firstName,
        String lastName,
        String phone,
        String address
) {
}
