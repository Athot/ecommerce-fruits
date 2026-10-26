package com.athot.ecommerce_fruits.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.athot.ecommerce_fruits.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer>{

     
}