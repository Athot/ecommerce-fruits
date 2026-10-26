package com.athot.ecommerce_fruits.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.athot.ecommerce_fruits.model.User;

public interface UserRepo extends JpaRepository<User, Long>{
Optional<User> findByEmail(String email);
Optional<User> findById(int userId);
    
}