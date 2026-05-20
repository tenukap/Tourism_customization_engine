package com.tourisam.Auth.Controller;

import com.tourisam.Auth.Model.User;
import com.tourisam.Auth.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private String getEmail(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    //get profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(){
        String email = getEmail();
        User user = userService.getProfile(email);
        return ResponseEntity.ok(Map.of(
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole(),
                "avatarUrl", user.getAvatarUrl() != null ? user.getAvatarUrl() : ""
        ));
    }

    //update profile
    @PutMapping("/profile")
    public ResponseEntity<?> UpdateProfile(@RequestBody Map<String, String> request){
        String email = getEmail();
        String newName = request.get("name");
        String newAvatarUrl = request.get("avatarUrl");
        String result = userService.updateProfile(email, newName, newAvatarUrl);
        return ResponseEntity.ok(result);
    }

    //change password
    @PutMapping("/password")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> request){
        String email = getEmail();
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        String result =  userService.updatePassword(email, oldPassword, newPassword);
        return ResponseEntity.ok(result);
    }

    //delete account
    @DeleteMapping("/account")
    public ResponseEntity<?> deleteAccount(){
        String email = getEmail();
        String result = userService.deleteAccount(email);
        return ResponseEntity.ok(result);
    }

}
