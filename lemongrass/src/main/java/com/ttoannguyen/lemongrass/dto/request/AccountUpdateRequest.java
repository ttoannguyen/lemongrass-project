package com.ttoannguyen.lemongrass.dto.Request;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountUpdateRequest {
    //    @Email
    //    String email;
    //    @Size(min = 3, message = "INVALID_USERNAME")
    //    String username;
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;

    String firstName;
    String lastName;
    LocalDate dob;
    String address;
    List<String> roles;
}
