package com.ttoannguyen.lemongrass.dto.Response.auth;

import com.ttoannguyen.lemongrass.dto.Response.account.AccountResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IntrospectResponse {
  boolean valid;
  AccountResponse account;
}
