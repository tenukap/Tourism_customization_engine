package com.tourisam.Auth.Service;

import com.tourisam.Auth.Model.User;
import com.tourisam.Auth.repository.userRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final userRepository userRepository;

    public AuthService(userRepository userRepository) {
        this.userRepository = userRepository;
    }


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

return  "OK";
    }
    public void RegisterUser(String username, String password,String email){
        User user = new User();
        user.setName(username);
        user.setPassword(password);
        user.setEmail(email);

        userRepository.save(user);

    }

}
