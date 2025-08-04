package com.ttoannguyen.lemongrass.dto.Request.account;

import java.time.LocalDate;
import java.util.List;

import com.ttoannguyen.lemongrass.dto.Request.image.ImageRequest;
import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountUpdateRequest {
  @Size(min = 8, message = "INVALID_PASSWORD")
  String password;

  String firstName;
  String lastName;
  LocalDate dob;
  String address;
  //  ImageRequest avatar;
  List<String> roles;
}
