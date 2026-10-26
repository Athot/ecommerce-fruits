package com.athot.ecommerce_fruits.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.athot.ecommerce_fruits.dto.UserResponseDTO;
import com.athot.ecommerce_fruits.model.User;
import com.athot.ecommerce_fruits.service.UserService;
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody  User user){
        return ResponseEntity.ok(userService.register(user));
    }

    // sign in controller
    @PostMapping("/signIn")
    public UserResponseDTO  SignIn(@RequestBody User user){
        return userService.signIn(user);
    }

}
