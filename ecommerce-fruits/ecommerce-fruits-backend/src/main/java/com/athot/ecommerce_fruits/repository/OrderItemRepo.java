
package com.athot.ecommerce_fruits.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.athot.ecommerce_fruits.model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Integer> {

    List<OrderItem> findByOrderId(int orderId);

}
