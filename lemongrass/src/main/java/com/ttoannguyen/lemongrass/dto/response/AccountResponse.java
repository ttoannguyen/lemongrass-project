package com.ttoannguyen.lemongrass.dto.response;

import com.ttoannguyen.lemongrass.dto.RoleDTO;

import java.time.LocalDateTime;
import java.util.List;

public record AccountResponse(
        Long id,
        String username,
        String email,
        String address,
        boolean inactive,
        boolean isDeleted,
        List<RoleDTO> roles,
        String createdBy,
        LocalDateTime createdDate,
        String lastModifiedBy,
        LocalDateTime lastModifiedDate
) {
}
