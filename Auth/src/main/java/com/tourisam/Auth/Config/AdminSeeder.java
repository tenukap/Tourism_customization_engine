package com.tourisam.Auth.Config;

import com.tourisam.Auth.Model.User;
import com.tourisam.Auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }


    @Override
    public void run(String... args) throws Exception {
            if(userRepository.findByEmail("admin@tourism.com") == null){
                User user = new User();
                user.setName("admin");
                user.setEmail("admin@tourism.com");
                String password = "admin";
                user.setPassword(passwordEncoder.encode(password));
                user.setRole("ADMIN");
                userRepository.save(user);
                System.out.println("Admin has been registered successfully");
            }

    }
}
