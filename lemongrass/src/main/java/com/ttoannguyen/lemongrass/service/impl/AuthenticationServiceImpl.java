package com.ttoannguyen.lemongrass.service.impl;

import com.nimbusds.jose.JOSEException;
import com.ttoannguyen.lemongrass.dto.Request.AuthenticationRequest;
import com.ttoannguyen.lemongrass.dto.Request.IntrospectRequest;
import com.ttoannguyen.lemongrass.dto.Response.AuthenticationResponse;
import com.ttoannguyen.lemongrass.dto.Response.IntrospectResponse;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.configuration.jwt.TokenProvider;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceImpl implements AuthenticationService {
    AccountRepository accountRepository;
    TokenProvider tokenProvider;
    PasswordEncoder passwordEncoder;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        final var account = accountRepository.findByUsername(request.getUsername());
        if(account == null) throw new AppException(ErrorCode.USER_NOT_EXISTED);

        final boolean authenticated =  passwordEncoder.matches(request.getPassword(), account.getPassword());
        if(!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        final var token = tokenProvider.generateToken(account);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public IntrospectResponse introspect(IntrospectRequest request)
            throws ParseException, JOSEException {
        final var token = request.getToken();
        final boolean valid = tokenProvider.verifyToken(token);
        return IntrospectResponse.builder()
                .valid(valid).build();
    }

}
