package com.tourisam.Auth.Service;

import com.tourisam.Auth.Model.User;
import com.tourisam.Auth.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public String registrationValidation (String username ,String password, String email) {

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
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);

        userRepository.save(user);

    }

    public String LoginVerification(String username,String password,String email){
        try{
            if(username.isEmpty() || email.isEmpty()){
                return "please enter username or emnail";
            }

            if(password.isEmpty()){
                return "please enter password";
            }

            User dbuser = userRepository.findByEmail(email);

            if(dbuser==null){
                return "user not found";

            }

            if(!dbuser.getEmail().equals(email)){
                return "email does not match";
            }

            if(!passwordEncoder.matches(password,dbuser.getPassword())){
                return "incorrect password";
            }

        }
        catch (Exception e){
            return "validation Error";
        }
        return "Login Successful";
    }

}
