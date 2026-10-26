
package com.athot.ecommerce_fruits.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.athot.ecommerce_fruits.dto.CheckoutRequest;
import com.athot.ecommerce_fruits.model.Order;
import com.athot.ecommerce_fruits.model.OrderStatus;
import com.athot.ecommerce_fruits.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Place order
    @PostMapping("/checkout/{userId}")
    public Order placeOrder(@PathVariable int userId, 
@RequestBody CheckoutRequest request

    ) {
        return orderService.placeOrder(userId, request);
    }

    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable int id) {
        return orderService.getOrderById(id);
    }

    // Get orders by user
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable int userId) {
        return orderService.getOrdersByUser(userId);
    }

    // Update order status
    @PutMapping("/{id}/status")
    public Order updateOrderStatus(
            @PathVariable int id,
            @RequestParam OrderStatus status) {
        return orderService.updateOrderStatus(id, status);
    }

    // Cancel order
    @PutMapping("/{id}/cancel")
    public Order cancelOrder(@PathVariable int id) {
        return orderService.cancelOrder(id);
    }
}
