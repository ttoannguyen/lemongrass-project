package com.ttoannguyen.lemongrass.controller.impl;

import java.text.ParseException;

import org.springframework.web.bind.annotation.RestController;

import com.nimbusds.jose.JOSEException;
import com.ttoannguyen.lemongrass.controller.AuthenticationController;
import com.ttoannguyen.lemongrass.dto.Request.auth.AuthenticationRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.IntrospectRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.LogoutRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.RefreshRequest;
import com.ttoannguyen.lemongrass.dto.Response.auth.AuthenticationResponse;
import com.ttoannguyen.lemongrass.dto.Response.auth.IntrospectResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.service.AuthenticationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationControllerImpl implements AuthenticationController {
    AuthenticationService authenticationService;

    @Override
    public ApiResponse<AuthenticationResponse> authenticate(AuthenticationRequest request) {
        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.authenticate(request))
                .build();
    }

    @Override
    public ApiResponse<IntrospectResponse> introspect(IntrospectRequest request) throws ParseException, JOSEException {
        return ApiResponse.<IntrospectResponse>builder()
                .result(authenticationService.introspect(request))
                .build();
    }

    @Override
    public ApiResponse<Void> logout(LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().build();
    }

    @Override
    public ApiResponse<AuthenticationResponse> refreshToken(RefreshRequest request)
            throws ParseException, JOSEException {
        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.refreshToken(request))
                .build();
    }
}
