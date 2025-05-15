package com.ttoannguyen.lemongrass.security;

import com.ttoannguyen.lemongrass.entity.AccountEntity;
import com.ttoannguyen.lemongrass.entity.ScopeEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;

@Component
public class JwtTokenProvider {
    @Value("${jwt.signer-key}")
    private String secret;

    @Value("${jwt.valid-duration}")
    private Long expiration;

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String generateToken(UserDetails userDetails) {
        AccountEntity account = (AccountEntity) userDetails;
        ArrayList<String> scope = new ArrayList<>(account.getRoles().stream()
                .map(role -> "ROLE_" + role.getName().name())
                .toList());

        scope.addAll(account.getRoles().stream()
                .flatMap(role -> role.getScopes().stream())
                .map(ScopeEntity::getName)
                .toList());

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);

        return Jwts.builder()
                .claim("scope", scope)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public List<String> getScopesFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        List<?> rawScope = claims.get("scope", List.class);
        if (rawScope == null) return Collections.emptyList();
        List<String> scopes = new ArrayList<>();
        for (var item : rawScope) {
            if (item instanceof String) {
                scopes.add((String) item);
            } else {
                throw new IllegalArgumentException("Scope contains non-String value: " + item);
            }
        }
        return scopes;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
