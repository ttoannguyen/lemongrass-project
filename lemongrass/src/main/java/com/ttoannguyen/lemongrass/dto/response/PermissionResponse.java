package com.ttoannguyen.lemongrass.dto.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PermissionResponse {
    String name;
    String description;
    String createdBy;
    LocalDateTime createdDate;
    LocalDateTime lastModifiedDate;
    String lastModifiedBy;
}
