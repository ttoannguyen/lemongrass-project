package com.ttoannguyen.lemongrass.service.dto.request;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountRequest {

    String username;


    String password;


    String firstName;


    String lastName;


    String email;


    String phone;


    String address;
}
