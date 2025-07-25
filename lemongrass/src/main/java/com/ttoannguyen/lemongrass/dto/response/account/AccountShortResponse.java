package com.ttoannguyen.lemongrass.dto.Response.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountShortResponse {
  String id;
  String username;
  String firstName;
  String lastName;
  String profilePictureUrl;
}
