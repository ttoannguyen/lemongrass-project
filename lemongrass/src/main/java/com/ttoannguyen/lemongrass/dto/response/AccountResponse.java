package com.ttoannguyen.lemongrass.dto.Response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AccountResponse {
    String id;
    String email;
    String username;
    String firstName;
    String lastName;
    LocalDate dob;
    String address;
    boolean inactive = false;
    boolean isDeleted = false;
    Set<RoleResponse> roles;
//    Set<String> roles;
    String createdBy;
    LocalDateTime createdDate;
    String lastModifiedBy;
    LocalDateTime lastModifiedDate;
}
