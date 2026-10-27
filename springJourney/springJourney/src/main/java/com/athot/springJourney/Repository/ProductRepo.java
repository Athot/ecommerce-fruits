package com.athot.springJourney.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.athot.springJourney.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer>{

}
