package com.ttoannguyen.lemongrass.dto.Response;

import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.FieldDefaults;

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
