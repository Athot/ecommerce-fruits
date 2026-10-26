
package com.athot.ecommerce_fruits.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.athot.ecommerce_fruits.model.Order;

public interface OrderRepo extends JpaRepository<Order, Integer> {

}
