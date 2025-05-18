package com.ttoannguyen.lemongrass.configuration.jwt;

import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;

@Slf4j
@Service
public class JwtProvider {
    @NonFinal
    @Value("${jwt.signer-key}")
    protected String SIGNER_KEY;

    public JwtDecoder jwtDecoder(){
        return NimbusJwtDecoder.withSecretKey(new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512"))
                .macAlgorithm(MacAlgorithm.HS512).build();
    }
}
