package com.tourisam.Auth.Controller;

import com.tourisam.Auth.Model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/Auth")
public class AuthController {

    //register endpoint
    @PostMapping("/register")
    public ResponseEntity <?> register(@RequestBody Map<String,String> request){
        try {
            String username = request.get("name");
            String email = request.get("email");
            String password = request.get("password");
            String splitpass = password.split("");

        }
        catch(Exception e ){

        }
    }

}
