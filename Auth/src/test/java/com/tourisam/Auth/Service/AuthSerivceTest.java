package com.tourisam.Auth.Service;
import com.tourisam.Auth.Model.User;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.junit.jupiter.api.Test;
import com.tourisam.Auth.repository.UserRepository;
import com.tourisam.Auth.Service.JwtService;
import com.tourisam.Auth.Service.AuthService;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.mockito.Mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class AuthSerivceTest {

    @Test
    public void TestRegisterUser(){
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
        JwtService jwtService = Mockito.mock(JwtService.class);

        when(passwordEncoder.encode(anyString())).thenReturn("11fowGetre");

        AuthService authService = new AuthService(userRepository,passwordEncoder,jwtService);
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        authService.RegisterUser("JakeP", "11fowGetre", "jake23@gmail.com");
        verify(userRepository).save(userCaptor.capture());
        User user = userCaptor.getValue();

        // Assertions

        assertEquals("JakeP", user.getName());

        assertEquals("jake23@gmail.com", user.getEmail());

        assertEquals("11fowGetre", user.getPassword());

    }

    @Test
    public void ShouldCheck_CurrentUser_ReturnLoginSucess(){
        UserRepository userRepository = Mockito.mock(UserRepository.class);
        PasswordEncoder passwordEncoder = Mockito.mock(PasswordEncoder.class);
        JwtService jwtService = Mockito.mock(JwtService.class);

        User mockUser = new User();
        mockUser.setName("JakeP");
        mockUser.setEmail("jake23@gmail.com");
        mockUser.setPassword("11fowGetre");

        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        AuthService authService = new AuthService(userRepository,passwordEncoder,jwtService);



        when(userRepository.findByEmail("jake23@gmail.com")).thenReturn(mockUser);
        when(jwtService.generateToken("jake23@gmail.com")).thenReturn("mock-token");

        String result = authService.LoginVerification("11fowGentre", "jake23@gmail.com");

        assertEquals("mock-token",result);

    }
}
