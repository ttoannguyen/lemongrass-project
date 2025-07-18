# reaction entity:

package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence._;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import lombok._;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "reaction")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Reaction extends AbstractAuditingEntity {
@Id
@GeneratedValue(strategy = GenerationType.UUID)
String id;

@Column(nullable = false)
String targetId;

@Enumerated(EnumType.STRING)
@Column(nullable = false)
ReactionTargetType targetType;

@ManyToOne
@JoinColumn(name = "account_id", nullable = false)
Account account;

// @ManyToOne
// @JoinColumn(name = "reaction_type_id", nullable = false)
// ReactionType reactionType;
}

# Post Entity:

package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence._;
import lombok._;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "post")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post extends AbstractAuditingEntity {
@Id
@GeneratedValue(strategy = GenerationType.UUID)
@Column(name = "id", updatable = false, nullable = false)
String id;

@Column(unique = true, nullable = false)
String title;

@Column(unique = true, nullable = false)
String content;

@Column(nullable = false)
String visibility;

@Column(nullable = false)
boolean isApproved;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "account_id")
Account account;

@ManyToOne
@JoinColumn(name = "groups_id")
Group group;

@ManyToOne
@JoinColumn(name = "recipe_id")
Recipe recipe;

@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
List<Image> images;
}

# Notification entity:

package com.ttoannguyen.lemongrass.entity;

import jakarta.persistence._;
import com.ttoannguyen.lemongrass.entity.enums.NotificationType;
import com.ttoannguyen.lemongrass.entity.enums.Priority;
import lombok._;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "notification")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Notification extends AbstractAuditingEntity {
@Id
@GeneratedValue(strategy = GenerationType.UUID)
String id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    Account account;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    NotificationType type;

    @Column(nullable = false)
    String content;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;

    @ManyToOne
    @JoinColumn(name = "groups_id")
    Group group;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    Recipe recipe;

    @Column(nullable = false)
    boolean isRead;

    @Enumerated(EnumType.STRING)
    Priority priority;

}

# Reaction request:

package com.ttoannguyen.lemongrass.dto.Request.reaction;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ttoannguyen.lemongrass.entity.enums.ReactionTargetType;
import lombok.\*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReactionRequest {
String targetId; // post
String receiverId; // userPostId
ReactionTargetType targetType;
}

# Notification messages response:

package com.ttoannguyen.lemongrass.dto.Response.notification;

import lombok.\*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationMessage {
String senderId;
String receiverId;
String message;
String targetType;
String targetId;
}

# websocket config:

package com.ttoannguyen.lemongrass.configuration;

import com.ttoannguyen.lemongrass.configuration.ws.AuthHandshakeInterceptor;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.config.StompBrokerRelayRegistration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
@Override
public void configureMessageBroker(MessageBrokerRegistry config) {
config.enableSimpleBroker("/topic");
config.setApplicationDestinationPrefixes("/app");
config.setUserDestinationPrefix("/user");
}

@Override
public void registerStompEndpoints(StompEndpointRegistry registry) {
registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:5173").withSockJS();
}
}

# Security config:

package com.ttoannguyen.lemongrass.configuration;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.ttoannguyen.lemongrass.configuration.jwt.CustomJwtDecoder;
import com.ttoannguyen.lemongrass.configuration.jwt.JwtAuthenticationEntryPoint;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SecurityConfig {

protected static final String[] PUBLIC_GET_ENDPOINTS = {
"/api/\_v1/feeds",
"/api/\_v1/recipes/**",
"/api/\_v1/posts",
"/api/\_v1/posts/**",
"/api/\_v1/categories/\*\*",
"/api/\_v1/ingredient_template"
};

protected static final String[] PUBLIC_POST_ENDPOINTS = {
"/api/\_v1/auth/login",
"/api/\_v1/auth/logout",
"/api/\_v1/auth/introspect",
"/api/\_v1/auth/refresh",
"/api/\_v1/accounts/register"
};

CustomJwtDecoder customJwtDecoder;

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
http.cors(cors -> {})
.csrf(AbstractHttpConfigurer::disable)
.authorizeHttpRequests(
authorize ->
authorize
.requestMatchers(HttpMethod.POST, PUBLIC_POST_ENDPOINTS)
.permitAll()
.requestMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINTS)
.permitAll()
.requestMatchers("/ws/\*\*")
.permitAll()
.anyRequest()
.authenticated())
.oauth2ResourceServer(
oauth2 ->
oauth2
.jwt(
jwtConfigurer ->
jwtConfigurer
.decoder(customJwtDecoder)
.jwtAuthenticationConverter(jwtAuthenticationConverter()))
.authenticationEntryPoint(new JwtAuthenticationEntryPoint()));

    return http.build();

}

@Bean
public CorsFilter corsFilter() {
CorsConfiguration config = new CorsConfiguration();
config.setAllowedOrigins(List.of("http://localhost:5173"));
config.setAllowedMethods(List.of("_"));
config.setAllowedHeaders(List.of("_"));
config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return new CorsFilter(source);

}

@Bean
public JwtAuthenticationConverter jwtAuthenticationConverter() {
JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter =
new JwtGrantedAuthoritiesConverter();
grantedAuthoritiesConverter.setAuthorityPrefix("");
JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
return jwtAuthenticationConverter;
}
}

# CustomJwtDecoder:

package com.ttoannguyen.lemongrass.configuration.jwt;

import java.text.ParseException;
import java.util.Objects;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import com.nimbusds.jose.JOSEException;
import com.ttoannguyen.lemongrass.dto.Request.auth.IntrospectRequest;
import com.ttoannguyen.lemongrass.service.AuthenticationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomJwtDecoder implements JwtDecoder {
@NonFinal
@Value("${jwt.signer-key}")
protected String SIGNER_KEY;

    AuthenticationService authenticationService;

    @NonFinal
    NimbusJwtDecoder nimbusJwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {

        try {
            final var response = authenticationService.introspect(
                    IntrospectRequest.builder().token(token).build());

            if (!response.isValid()) throw new JwtException("Token invalid!");
        } catch (ParseException | JOSEException e) {
            throw new JwtException(e.getMessage());
        }
        if (Objects.isNull(nimbusJwtDecoder)) {
            SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
            nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }
        return nimbusJwtDecoder.decode(token);
    }

}

# JwtAuthenticationEntryPoint

package com.ttoannguyen.lemongrass.configuration.jwt;

import java.io.IOException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ttoannguyen.lemongrass.dto.apiResponse.ApiResponse;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
@Override
public void commence(
HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
throws IOException {
ErrorCode errorCode = ErrorCode.UNAUTHENTICATED;

        response.setStatus(errorCode.getHttpStatusCode().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ApiResponse<?> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        ObjectMapper objectMapper = new ObjectMapper();

        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
        response.flushBuffer();
    }

}

# Tokenprovider:

package com.ttoannguyen.lemongrass.configuration.jwt;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.nimbusds.jose.\*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.ttoannguyen.lemongrass.entity.Account;
import com.ttoannguyen.lemongrass.exception.AppException;
import com.ttoannguyen.lemongrass.exception.enums.ErrorCode;
import com.ttoannguyen.lemongrass.repository.InvalidatedTokenRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TokenProvider {
InvalidatedTokenRepository invalidatedTokenRepository;

@NonFinal
@Value("${jwt.signer-key}")
protected String SIGNER_KEY;

@NonFinal
@Value("${jwt.valid-duration}")
protected long VALID_DURATION;

@NonFinal
@Value("${jwt.refreshable-duration}")
protected long REFRESHABLE_DURATION;

public String generateToken(Account account) {
log.info("Signer key {}", SIGNER_KEY);

    JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
    JWTClaimsSet jwtClaimsSet =
        new JWTClaimsSet.Builder()
            .subject(account.getUsername())
            .issuer("Lemongrass")
            .issueTime(new Date())
            .expirationTime(
                new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
            .claim("scope", buildScope(account))
            .claim("uid", account.getId())
            .jwtID(UUID.randomUUID().toString())
            .build();

    Payload payload = new Payload(jwtClaimsSet.toJSONObject());
    JWSObject jwsObject = new JWSObject(jwsHeader, payload);
    try {
      jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
      return jwsObject.serialize();
    } catch (JOSEException e) {
      log.error("Cannot create token: ", e);
      throw new RuntimeException(e);
    }

}

public SignedJWT verifyToken(String token, boolean isRefresh)
throws JOSEException, ParseException {
JWSVerifier jwsVerifier = new MACVerifier(SIGNER_KEY.getBytes());
SignedJWT signedJWT = SignedJWT.parse(token);
Date expiryTime =
(isRefresh)
? new Date(
signedJWT
.getJWTClaimsSet()
.getIssueTime()
.toInstant()
.plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS)
.toEpochMilli())
: signedJWT.getJWTClaimsSet().getExpirationTime();

    final var verified = signedJWT.verify(jwsVerifier);

    if (!(verified && expiryTime.after(new Date())))
      throw new AppException(ErrorCode.UNAUTHENTICATED);

    if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
      throw new AppException(ErrorCode.UNAUTHENTICATED);

    return signedJWT;

}

private String buildScope(Account account) {
final StringJoiner stringJoiner = new StringJoiner(" ");
if (!CollectionUtils.isEmpty(account.getRoles())) {
account
.getRoles()
.forEach(
role -> {
stringJoiner.add("ROLE\_" + role.getName());
if (!CollectionUtils.isEmpty(role.getPermissions()))
role.getPermissions()
.forEach(permission -> stringJoiner.add(permission.getName()));
});
}
return stringJoiner.toString();
}
}

# AuthHandshakeInterceptor:

package com.ttoannguyen.lemongrass.configuration.ws;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthHandshakeInterceptor extends HttpSessionHandshakeInterceptor
implements ChannelInterceptor {

final JwtDecoder jwtDecoder;

@Override
public Message<?> preSend(Message<?> message, MessageChannel channel) {
StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

    List<String> authHeaders = accessor.getNativeHeader("Authorization");
    if (authHeaders != null && !authHeaders.isEmpty()) {
      String bearer = authHeaders.get(0);
      if (bearer.startsWith("Bearer ")) {
        String token = bearer.substring(7);

        try {
          Jwt jwt = jwtDecoder.decode(token);

          String username = jwt.getSubject(); // id người tim

          Authentication auth =
              new UsernamePasswordAuthenticationToken(
                  username, // id người tim
                  null, List.of());

          accessor.setUser(auth);

          log.info("✅ Authenticated WebSocket userId: {}", username);
        } catch (Exception e) {
          log.warn("❌ Invalid JWT token in WebSocket handshake: {}", e.getMessage());
        }
      }
    }

    return message;

}
}

# Encoderconfig:

package com.ttoannguyen.lemongrass.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class EncoderConfig {
@Bean
public PasswordEncoder passwordEncoder() {
return new BCryptPasswordEncoder(10);
}
}
