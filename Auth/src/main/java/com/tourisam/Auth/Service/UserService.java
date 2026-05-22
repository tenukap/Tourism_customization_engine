package com.tourisam.Auth.Service;
import com.tourisam.Auth.Model.User;
import com.tourisam.Auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String updateProfile(String email, String newName, String newAvatarUrl){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(newName != null && !newName.trim().isEmpty()){
            user.setName(newName.trim());
        }

        if(newAvatarUrl != null && !newAvatarUrl.trim().isEmpty()){
            user.setAvatarUrl(newAvatarUrl.trim());
        }

        userRepository.save(user);
        return "Profile updated successfully";
    }

    public String updatePassword(String email, String oldPassword, String newPassword){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(oldPassword,user.getPassword())){
            throw new  RuntimeException("Old password doesn't match");
        }

        if(newPassword == null || newPassword.length() < 8){
            throw new  RuntimeException("New password must be at least 8 characters");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "Password updated successfully";
    }

    public String deleteAccount(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.delete(user);
        return "Account deleted successfully";
    }



    public User getProfile(String email){
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
