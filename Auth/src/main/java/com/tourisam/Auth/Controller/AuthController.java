package com.tourisam.Auth.Controller;

import com.tourisam.Auth.Model.User;
import com.tourisam.Auth.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/Auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //register endpoint
    @PostMapping("/register")
    public ResponseEntity <?> register(@RequestBody Map<String,String> request){

            String username = request.get("name");
            String email = request.get("email");
            String password = request.get("password");

            String result = authService.RegisterUser(username,password,email);

            if(!result.equals("User created")){
                return ResponseEntity.badRequest().body(result);
            }

            authService.RegisterUser(username,password,email);
            return ResponseEntity.ok("user added sucessfully");

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String password = request.get("password");
        String email = request.get("email");

        String result = authService.LoginVerification(password, email);

        if (result.equals("please enter username me or email") ||
                result.equals("please enter password") ||
                result.equals("user not found") ||
                result.equals("incorrect password") ||
                result.equals("validation Error")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(Map.of("token", result));
    }

}
