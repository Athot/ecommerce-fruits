package com.athot.ecommerce_fruits.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.athot.ecommerce_fruits.model.Cart;
import com.athot.ecommerce_fruits.model.User;

public interface CartRepo extends JpaRepository<Cart, Integer> {
List<Cart> findByUser(User user);
    
}  
