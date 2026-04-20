package com.tourisam.Auth.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(name = "createdAt")
    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        createdAt = java.time.LocalDateTime.now();

    }

    @PostPersist
    protected void afterCreate(){
        log.info("User Sucessfully activated ID "+id);
    }
}
