package com.ttoannguyen.lemongrass.configuration;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnvLoader {
  public static final Dotenv dotenv = Dotenv.load();
}
