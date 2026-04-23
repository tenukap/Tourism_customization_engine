package com.tourisam.Auth.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private String SECRET = "mysecretkey";

    public String generateToken(String email) {
        return Jwts.builder().setSubject(email).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)).signWith(SignatureAlgorithm.HS256, SECRET).compact();

    }
}
