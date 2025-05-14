package com.ttoannguyen.lemongrass.Controller.impl;

import com.ttoannguyen.lemongrass.Controller.AccountController;
import com.ttoannguyen.lemongrass.service.AccountService;
import com.ttoannguyen.lemongrass.service.dto.AccountResponseRecord;
import com.ttoannguyen.lemongrass.service.dto.request.AccountRequest;
import com.ttoannguyen.lemongrass.service.dto.request.SignInRequestRecord;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AccountControllerImpl implements AccountController {
    AccountService accountService;

    @Override
    public ResponseEntity<AccountResponseRecord> register(final AccountRequest request) {
        return new ResponseEntity<>(accountService.register(request), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> login(SignInRequestRecord request) {
        return null;
    }
}
