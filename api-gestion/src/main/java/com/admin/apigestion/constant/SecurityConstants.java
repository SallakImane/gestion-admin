package com.admin.apigestion.constant;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Data
public class SecurityConstants {
    private String authLoginUrl;
    // Signing key for HS512 algorithm
    // HS512 algorithm needs a key with size at least 512 bytes.
    // You can use the page http://www.allkeysgenerator.com/ to generate all kinds of keys
    private String jwtSecret;
    // JWT token defaults
    private String tokenHeader;
    private String tokenPrefix;
    private String tokenType;
    private String tokenIssuer;
    private String tokenAudience;
}