package com.ttoannguyen.lemongrass.dto.response;

import java.util.List;

public record LoginResponse(
        String token,
        String username,
        List<String> roles
) {
}
