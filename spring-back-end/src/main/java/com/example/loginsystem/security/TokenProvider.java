package com.example.loginsystem.security;

import com.example.loginsystem.config.AppProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final AppProperties appProperties;

    private final String KEY;

    public TokenProvider(AppProperties appProperties) {
        this.appProperties = appProperties;
        this.KEY = appProperties.getAuth().getTokenSecret();
    }

    public String createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date expiryDate = new Date(new Date().getTime() + appProperties.getAuth().getTokenExpirationMillis());

        return Jwts.builder()
                   .setSubject(Long.toString(userPrincipal.getId()))
                   .setIssuedAt(new Date())
                   .setExpiration(expiryDate)
                   .signWith(Keys.hmacShaKeyFor(KEY.getBytes()))
                   .compact();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                            .setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes()))
                            .build()
                            .parseClaimsJws(token)
                            .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes()))
                .build()
                .parseClaimsJws(token);
            return true;
        }
        catch (SignatureException e) {
            logger.error("Invalid JWT signature");
        }
        catch (MalformedJwtException e) {
            logger.error("Invalid JWT token");
        }
        catch (ExpiredJwtException e) {
            logger.error("Expired JWT token");
        }
        catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token");
        }
        catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty");
        }
        return false;
    }
}
