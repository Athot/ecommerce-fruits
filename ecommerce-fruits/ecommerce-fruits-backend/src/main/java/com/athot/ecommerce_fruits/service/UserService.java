package com.athot.ecommerce_fruits.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.athot.ecommerce_fruits.dto.UserResponseDTO;
import com.athot.ecommerce_fruits.model.User;
import com.athot.ecommerce_fruits.repository.UserRepo;
@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }


    public UserResponseDTO signIn(User user){  
        User existingUser = userRepo.findByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if(!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())){
            throw new RuntimeException("Invalid Password");
        }
        String token = jwtService.generateToken(existingUser.getEmail());
        return new UserResponseDTO(
            existingUser.getId(),
            existingUser.getName(),
            existingUser.getEmail(),
            existingUser.getRole(),
            token
        );
    }
}
