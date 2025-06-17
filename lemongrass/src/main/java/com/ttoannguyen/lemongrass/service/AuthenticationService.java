package com.ttoannguyen.lemongrass.service;

import java.text.ParseException;

import com.nimbusds.jose.JOSEException;
import com.ttoannguyen.lemongrass.dto.Request.auth.AuthenticationRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.IntrospectRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.LogoutRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.RefreshRequest;
import com.ttoannguyen.lemongrass.dto.Response.auth.AuthenticationResponse;
import com.ttoannguyen.lemongrass.dto.Response.auth.IntrospectResponse;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);

    IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException;

    void logout(LogoutRequest request) throws ParseException, JOSEException;

    AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;
}
