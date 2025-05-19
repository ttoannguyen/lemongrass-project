package com.ttoannguyen.lemongrass.dto.Response;

import java.time.LocalDateTime;
import java.util.Set;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleResponse {
    String name;
    String description;
    Set<PermissionResponse> permissions;
    String createdBy;
    LocalDateTime createdDate;
    LocalDateTime lastModifiedDate;
    String lastModifiedBy;
}
