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
    "/api/_v1/feeds",
    "/api/_v1/recipes/**",
    "/api/_v1/posts",
    "/api/_v1/posts/**",
    "/api/_v1/categories/**",
    "/api/_v1/ingredient_template"
  };

  protected static final String[] PUBLIC_POST_ENDPOINTS = {
    "/api/_v1/auth/login",
    "/api/_v1/auth/logout",
    "/api/_v1/auth/introspect",
    "/api/_v1/auth/refresh",
    "/api/_v1/accounts/register"
  };

  CustomJwtDecoder customJwtDecoder;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(
            authorize ->
                authorize
                    .requestMatchers(HttpMethod.POST, PUBLIC_POST_ENDPOINTS)
                    .permitAll()
                    .requestMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINTS)
                    .permitAll()
                    .requestMatchers("/ws/**")
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
  public UrlBasedCorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:5173"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  @Bean
  public CorsFilter corsFilter() {
    return new CorsFilter(corsConfigurationSource());
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

  //  @Bean
  //  public CorsFilter corsFilter() {
  //    CorsConfiguration config = new CorsConfiguration();
  //    config.setAllowedOrigins(List.of("http://localhost:5173"));
  //    config.setAllowedMethods(List.of("*"));
  //    config.setAllowedHeaders(List.of("*"));
  //    config.setAllowCredentials(true);
  //
  //    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
  //    source.registerCorsConfiguration("/**", config);
  //
  //    return new CorsFilter(source);
  //  }
  //
  //  @Bean
  //  public JwtAuthenticationConverter jwtAuthenticationConverter() {
  //    JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter =
  //        new JwtGrantedAuthoritiesConverter();
  //    grantedAuthoritiesConverter.setAuthorityPrefix("");
  //    JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
  //    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
  //    return jwtAuthenticationConverter;
  //  }
}
