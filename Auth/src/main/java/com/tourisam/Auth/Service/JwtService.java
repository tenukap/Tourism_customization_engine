package com.tourisam.Auth.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
    private final String SECRET = "9dK4fLm2QxP8vN5sRt7YwH3zBc6Ea1Uf";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .claim("role", role)
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    //extracting email
    public String extractEmail(String token){
        return  Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    //extracting Role
    public String extractRole(String token){
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("role",String.class);
    }

    public Boolean validateToken(String token){
        try{
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        }
        catch (Exception e){

        }
        return false;
    }
}
