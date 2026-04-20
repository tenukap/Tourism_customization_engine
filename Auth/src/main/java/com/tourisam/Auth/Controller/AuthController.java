package com.tourisam.Auth.Controller;

import com.tourisam.Auth.Model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/Auth")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity <?> register(){
        User user = new User();

    }

}
