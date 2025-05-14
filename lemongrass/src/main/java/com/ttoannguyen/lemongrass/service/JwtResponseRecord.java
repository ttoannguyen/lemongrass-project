package com.ttoannguyen.lemongrass.service;

import com.ttoannguyen.lemongrass.service.dto.AccountResponseRecord;

public record JwtResponseRecord(
        String token,
        AccountResponseRecord account
) {
}
