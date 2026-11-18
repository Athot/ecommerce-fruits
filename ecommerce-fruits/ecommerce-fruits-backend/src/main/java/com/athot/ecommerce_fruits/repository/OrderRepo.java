
package com.athot.ecommerce_fruits.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.athot.ecommerce_fruits.model.Order; 

public interface OrderRepo extends JpaRepository<Order, Integer> {
    // total number of the order 
    long count(); 
    List<Order> findTop5ByOrderByCreatedAtDesc(); 
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    BigDecimal getTotalOrderAmount();

}
