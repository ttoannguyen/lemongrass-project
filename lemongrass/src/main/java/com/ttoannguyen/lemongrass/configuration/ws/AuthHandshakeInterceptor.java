package com.ttoannguyen.lemongrass.configuration.ws;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
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
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthHandshakeInterceptor extends HttpSessionHandshakeInterceptor
    implements ChannelInterceptor {

  final JwtDecoder jwtDecoder;

  @Override
  public boolean beforeHandshake(
      ServerHttpRequest request,
      ServerHttpResponse response,
      WebSocketHandler wsHandler,
      Map<String, Object> attributes) {
    List<String> authHeaders = request.getHeaders().get("Authorization");
    log.info(request.toString());
    log.info(request.getHeaders().toString());
    if (authHeaders == null || authHeaders.isEmpty()) {
      log.warn(
          "Missing Authorization header in WebSocket handshake for {}",
          request.getRemoteAddress());
      return false;
    }

    String bearer = authHeaders.get(0);
    if (!bearer.startsWith("Bearer ")) {
      log.warn(
          "Invalid Authorization header format: {} for {}", bearer, request.getRemoteAddress());
      return false;
    }

    String token = bearer.substring(7);
    try {
      Jwt jwt = jwtDecoder.decode(token);
      String userId = jwt.getClaimAsString("uid"); // Giả định claim chứa userId
      log.info(userId);
      if (userId == null) {
        log.warn("JWT token does not contain userId claim");
        return false;
      }
      log.info("Valid JWT token in handshake, userId: {}", userId);
      attributes.put("userId", userId);
      return true;
    } catch (Exception e) {
      log.warn("Invalid JWT token in WebSocket handshake: {}", e.getMessage());
      return false;
    }
  }

  @Override
  public void afterHandshake(
      ServerHttpRequest request,
      ServerHttpResponse response,
      WebSocketHandler wsHandler,
      Exception exception) {
    if (exception != null) {
      log.error(
          "WebSocket handshake failed for {}: {}",
          request.getRemoteAddress(),
          exception.getMessage());
    }
  }

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

    List<String> authHeaders = accessor.getNativeHeader("Authorization");
    if (authHeaders == null || authHeaders.isEmpty()) {
      log.warn(
          "Missing Authorization header in STOMP message for command: {}", accessor.getCommand());
      return message;
    }

    String bearer = authHeaders.get(0);
    if (!bearer.startsWith("Bearer ")) {
      log.warn(
          "Invalid Authorization header format in STOMP message: {} for command: {}",
          bearer,
          accessor.getCommand());
      return message;
    }
    String token = bearer.substring(7);
    try {
      Jwt jwt = jwtDecoder.decode(token);
      String userId = jwt.getClaimAsString("uid"); // Giả định claim chứa userId
      if (userId == null) {
        log.warn("JWT token does not contain userId claim in STOMP message");
        return message;
      }
      Authentication auth = new UsernamePasswordAuthenticationToken(userId, null, List.of());
      SecurityContextHolder.getContext().setAuthentication(auth);
      accessor.setUser(auth);
      log.info(
          "Authenticated WebSocket userId: {} for command: {}", userId, accessor.getCommand());
    } catch (Exception e) {
      log.warn("Invalid JWT token in STOMP message: {}", e.getMessage());
    }

    return message;

    //    if (authHeaders != null && !authHeaders.isEmpty()) {
    //      String bearer = authHeaders.get(0);
    //      if (bearer.startsWith("Bearer ")) {
    //        String token = bearer.substring(7);
    //
    //        try {
    //          Jwt jwt = jwtDecoder.decode(token);
    //
    //          String username = jwt.getSubject(); // username người tim
    //
    //          Authentication auth =
    //              new UsernamePasswordAuthenticationToken(
    //                  username, // username người tim
    //                  null, List.of());
    //
    //          accessor.setUser(auth);
    //
    //          log.info("Authenticated WebSocket userId: {}", username);
    //        } catch (Exception e) {
    //          log.warn("Invalid JWT token in WebSocket handshake: {}", e.getMessage());
    //        }
    //      }
    //    }

    //    return message;
  }
}
