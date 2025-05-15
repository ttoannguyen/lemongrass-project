package com.ttoannguyen.lemongrass.Controller.impl;

import com.ttoannguyen.lemongrass.Controller.AuthController;
import com.ttoannguyen.lemongrass.service.AuthService;
import com.ttoannguyen.lemongrass.service.JwtResponseRecord;
import com.ttoannguyen.lemongrass.service.dto.request.AccountRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthControllerImpl implements AuthController {
    AuthService authService;

    @Override
    public ResponseEntity<JwtResponseRecord> register(final AccountRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
}
