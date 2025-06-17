package com.ttoannguyen.lemongrass.controller;

import java.text.ParseException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nimbusds.jose.JOSEException;
import com.ttoannguyen.lemongrass.dto.Request.auth.AuthenticationRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.IntrospectRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.LogoutRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.RefreshRequest;
import com.ttoannguyen.lemongrass.dto.Response.auth.AuthenticationResponse;
import com.ttoannguyen.lemongrass.dto.Response.auth.IntrospectResponse;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;

@RequestMapping("/api/_v1/auth")
public interface AuthenticationController {
    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request);

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException;

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException;

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> refreshToken(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException;
}
