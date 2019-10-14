package com.admin.apigestion.security;

import com.admin.apigestion.constant.SecurityConstants;
import com.admin.apigestion.dto.LoginDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
public class JwtAuthenticationFilter  extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final SecurityConstants securityConstants;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, SecurityConstants securityConstants) {
        this.authenticationManager = authenticationManager;
        this.securityConstants = securityConstants;
        setFilterProcessesUrl(securityConstants.getAuthLoginUrl());
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            var creds = new ObjectMapper().readValue(request.getInputStream(), LoginDto.class);
            /*request.getInputStream() is used to get the body of the request*/
            var authenticationToken = new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword());
            return authenticationManager.authenticate(authenticationToken);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain filterChain, Authentication authentication) {
        var user = ((CustomUserDetails) authentication.getPrincipal());

        var roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        var signingKey = securityConstants.getJwtSecret().getBytes();
        var token = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(signingKey), SignatureAlgorithm.HS512)
                .setHeaderParam("typ", securityConstants.getTokenType())
                .setIssuer(securityConstants.getTokenIssuer())
                .setAudience(securityConstants.getTokenAudience())
                .setSubject(user.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + 864000000)) // current time + 10 day
                .claim("rol", roles)
                .compact();

        response.addHeader(securityConstants.getTokenHeader(), securityConstants.getTokenPrefix() + token);
        response.addHeader("Access-Control-Expose-Headers", "Authorization"); // this will allow angular to read authorization header from response
    }
}