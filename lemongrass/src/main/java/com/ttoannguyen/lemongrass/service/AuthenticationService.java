package com.ttoannguyen.lemongrass.service;

import java.text.ParseException;

import com.nimbusds.jose.JOSEException;
import com.ttoannguyen.lemongrass.dto.Request.AuthenticationRequest;
import com.ttoannguyen.lemongrass.dto.Request.IntrospectRequest;
import com.ttoannguyen.lemongrass.dto.Request.LogoutRequest;
import com.ttoannguyen.lemongrass.dto.Request.RefreshRequest;
import com.ttoannguyen.lemongrass.dto.Response.AuthenticationResponse;
import com.ttoannguyen.lemongrass.dto.Response.IntrospectResponse;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);

    IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException;

    void logout(LogoutRequest request) throws ParseException, JOSEException;

    AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException;
}
