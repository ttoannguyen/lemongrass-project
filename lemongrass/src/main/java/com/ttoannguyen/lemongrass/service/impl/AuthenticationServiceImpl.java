package com.ttoannguyen.lemongrass.service.impl;

import java.text.ParseException;
import java.util.Date;

import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.mapper.AccountMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.JOSEException;
import com.ttoannguyen.lemongrass.configuration.jwt.TokenProvider;
import com.ttoannguyen.lemongrass.dto.Request.auth.AuthenticationRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.IntrospectRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.LogoutRequest;
import com.ttoannguyen.lemongrass.dto.Request.auth.RefreshRequest;
import com.ttoannguyen.lemongrass.dto.Response.auth.AuthenticationResponse;
import com.ttoannguyen.lemongrass.dto.Response.auth.IntrospectResponse;
import com.ttoannguyen.lemongrass.entity.InvalidatedToken;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.AccountRepository;
import com.ttoannguyen.lemongrass.repository.InvalidatedTokenRepository;
import com.ttoannguyen.lemongrass.service.AuthenticationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceImpl implements AuthenticationService {
  AccountRepository accountRepository;
  TokenProvider tokenProvider;
  PasswordEncoder passwordEncoder;
  InvalidatedTokenRepository invalidatedTokenRepository;
  AccountMapper accountMapper;

  @Override
  public AuthenticationResponse authenticate(AuthenticationRequest request) {

    final Account account =
        accountRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

    final boolean authenticated =
        passwordEncoder.matches(request.getPassword(), account.getPassword());
    if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

    final var token = tokenProvider.generateToken(account);

    return AuthenticationResponse.builder()
        .token(token)
        .account(accountMapper.toAccountResponse(account))
        .build();
  }

  @Override
  @Transactional
  public IntrospectResponse introspect(IntrospectRequest request)
      throws ParseException, JOSEException {
    final var token = request.getToken();
    final var inValid = true;
    try {
      final var jwtClaims = tokenProvider.verifyToken(token, false);
      final var username = jwtClaims.getJWTClaimsSet().getSubject();
      final Account account =
          accountRepository
              .findByUsername(username)
              .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
      return IntrospectResponse.builder()
          .valid(inValid)
          .account(accountMapper.toAccountResponse(account))
          .build();
    } catch (AppException e) {
      return IntrospectResponse.builder().valid(!inValid).account(null).build();
    }
  }

  @Override
  public void logout(LogoutRequest request) throws ParseException, JOSEException {
    try {
      final var signToken = tokenProvider.verifyToken(request.getToken(), true);
      String jit = signToken.getJWTClaimsSet().getJWTID();

      Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
      InvalidatedToken invalidatedToken =
          InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

      invalidatedTokenRepository.save(invalidatedToken);
    } catch (AppException e) {
      log.info("Token already expired!");
    }
  }

  @Override
  public AuthenticationResponse refreshToken(RefreshRequest request)
      throws ParseException, JOSEException {
    final var signJWT = tokenProvider.verifyToken(request.getToken(), true);
    final var jit = signJWT.getJWTClaimsSet().getJWTID();
    final var expiryTime = signJWT.getJWTClaimsSet().getExpirationTime();
    InvalidatedToken invalidatedToken =
        InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();
    invalidatedTokenRepository.save(invalidatedToken);
    final var username = signJWT.getJWTClaimsSet().getSubject();
    final var account =
        accountRepository
            .findByUsername(username)
            .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    final var token = tokenProvider.generateToken(account);

    return AuthenticationResponse.builder().token(token).build();
  }
}
