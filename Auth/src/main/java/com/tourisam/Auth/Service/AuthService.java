package com.tourisam.Auth.Service;

import com.tourisam.Auth.JwtUtill;
import com.tourisam.Auth.Model.User;
import com.tourisam.Auth.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.tourisam.Auth.Service.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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

        if( !password.matches("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%&*]).{8}") ){
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

    public String LoginVerification(String password,String email){
        User dbuser = null;
        try{
            if( email.isEmpty()){
                return "please enter username or email";
            }

            if(password.isEmpty()){
                return "please enter password";
            }

            dbuser = userRepository.findByEmail(email);

            if(dbuser==null){
                return "user not found";

            }

            if(!passwordEncoder.matches(password,dbuser.getPassword())){
                return "incorrect password";
            }

        }
        catch (Exception e){
            return "validation Error";
        }
        String token = jwtService.generateToken(email);
        return token;
    }

}
