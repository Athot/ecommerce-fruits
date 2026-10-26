package com.athot.ecommerce_fruits.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.athot.ecommerce_fruits.model.Favourite;
import com.athot.ecommerce_fruits.model.Product;
import com.athot.ecommerce_fruits.model.User;

public interface FavouriteRepo extends JpaRepository<Favourite, Integer>{
    List<Favourite> findByUser(User user);
    Optional<Favourite> findByUserAndProduct(
    User user,
    Product product  
    );
    
}  
