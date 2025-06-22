package com.ttoannguyen.lemongrass.dto.Response.account;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonInclude;

import com.ttoannguyen.lemongrass.dto.Response.role.RoleResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
  String bio;
  String address;
  boolean inactive;
  boolean isDeleted;
  String profilePictureUrl;
  Set<RoleResponse> roles;
  String createdBy;
  LocalDateTime createdDate;
  String lastModifiedBy;
  LocalDateTime lastModifiedDate;
}
