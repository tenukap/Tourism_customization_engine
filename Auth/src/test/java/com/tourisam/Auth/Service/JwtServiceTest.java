package com.tourisam.Auth.Service;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class JwtServiceTest {
    public JwtService jwtService = new JwtService();

    @Test
    public void generateToken_ShouldNotBeNullTest()
    {
        String email = "franks@gmail.com";
        String token = jwtService.generateToken(email);

        assertNotNull(token);
    }

    @Test
    public void generateToken_ShouldGenerateTwoTokens(){
        String email1 = jwtService.generateToken("hans@gmail.com");
        String email2 = jwtService.generateToken("jenny39@gmail.com");

        assertNotEquals(email1,email2);
    }

}
