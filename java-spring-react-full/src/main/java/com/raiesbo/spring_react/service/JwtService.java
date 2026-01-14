package com.raiesbo.spring_react.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtService {
    static final long EXPIRATION_TIME = 86_400_000; // 1 day in ms
    static final String PREFIX = "Bearer";

    // Generate a secret key (only demonstration)
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Generate signed JWT token
    public String getToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    public String getAuthUser(HttpServletRequest req) {
        String token = req.getHeader("Authorization");

        if (token != null) {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace(PREFIX, ""))
                    .getBody()
                    .getSubject();
        }

        return null;
    }
}
