package com.ttoannguyen.lemongrass;

import io.micrometer.common.util.StringUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
public class LemongrassApplication {

	private static final Logger log = LoggerFactory.getLogger(LemongrassApplication.class);

	public static void main(String[] args) {
		final var app = new SpringApplication(LemongrassApplication.class);
		final var env = app.run(args).getEnvironment();
		logApplicationStartup(env);
	}

	private static void logApplicationStartup(final Environment env) {
		var protocol = "http";
		if (env.getProperty("server.ssl.key-store") != null) {
			protocol = "https";
		}
		final var serverPort = env.getProperty("server.port");
		var contextPath = env.getProperty("server.servlet.context-path");
		if (StringUtils.isBlank(contextPath)) {
			contextPath = "/";
		}
		String hostAddress = "localhost";
		try {
			hostAddress = InetAddress.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {
			log.warn("The host name could not be determined, using `localhost` as fallback");
		}

		log.info(
				"""
                        ----------------------------------------------------------
                        Application '{}' is running! Access URLs:
                        Local     : {}://localhost:{}{}
                        External  : {}://{}:{}{}
                        Profile(s): {}
                        ----------------------------------------------------------
                        """,
				env.getProperty("spring.application.name"),
				protocol,
				serverPort,
				contextPath,
				protocol,
				hostAddress,
				serverPort,
				contextPath,
				env.getActiveProfiles());
	}
}
