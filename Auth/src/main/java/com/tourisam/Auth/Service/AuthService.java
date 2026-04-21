package com.tourisam.Auth.Service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public String Validation (String username ,String password, String email) {

    try {

        //username null validation
        if (username == null || username.isEmpty()) {
            return "username cannot be empty";
        }
        //email null validation
        if (email == null || email.isEmpty()) {
            return "Email cannot be empty";
        }

        if (password == null || password.isEmpty()) {
            return "password cannot be empty";
        }

        if( password.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&*]).{8}") ){
            return " password must meet the requirments mentioned";
        }
    }
    catch(Exception e){
        return "Validation not complete";


    }

return  null;
    }



    //password null validation


    //password strength validation

}
