
package com.athot.ecommerce_fruits.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.athot.ecommerce_fruits.dto.CheckoutRequest;
import com.athot.ecommerce_fruits.model.Cart;
import com.athot.ecommerce_fruits.model.Order;
import com.athot.ecommerce_fruits.model.OrderItem;
import com.athot.ecommerce_fruits.model.OrderStatus;
import com.athot.ecommerce_fruits.model.User;
import com.athot.ecommerce_fruits.repository.CartRepo;
import com.athot.ecommerce_fruits.repository.OrderItemRepo;
import com.athot.ecommerce_fruits.repository.OrderRepo;
import com.athot.ecommerce_fruits.repository.UserRepo;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private OrderItemRepo orderItemRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;

    // Place an order from the user's cart
    @Transactional
    public Order placeOrder(int userId, CheckoutRequest request) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                    new RuntimeException("User not found: " + userId));

        List<Cart> cartItems = cartRepo.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        // Calculate total using current product prices
        for (Cart cart : cartItems) {

            if (cart.getQuantity() <= 0) {
                throw new RuntimeException("Invalid cart quantity");
            }

            BigDecimal itemTotal = cart.getProduct()
                    .getPrice()
                    .multiply(BigDecimal.valueOf(cart.getQuantity()));

            totalAmount = totalAmount.add(itemTotal);
        }

        // Create the order
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.PENDING);


        // save delivery address with the order
        order.setFullName(request.getFullName());
        order.setPhone(request.getPhone());
        order.setAddressLine(request.getAddressLine());
        order.setCity(request.getCity());
        order.setState(request.getState());
        order.setPostalCode(request.getPostalCode());
        Order savedOrder = orderRepo.save(order);

        // Create order items
        List<OrderItem> orderItems = new ArrayList<>();

        for (Cart cart : cartItems) {

            OrderItem item = new OrderItem();

            item.setOrder(savedOrder);
            item.setProduct(cart.getProduct());
            item.setQuantity(cart.getQuantity());
            item.setPrice(cart.getProduct().getPrice());

            orderItems.add(item);
        }

        orderItemRepo.saveAll(orderItems);

        // Clear the user's cart after successful order creation
        cartRepo.deleteAll(cartItems);

        return savedOrder;
    }

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    // Get order by ID
    public Order getOrderById(int id) {
        return orderRepo.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Order not found: " + id));
    }

    // Get orders belonging to a user
    public List<Order> getOrdersByUser(int userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                    new RuntimeException("User not found: " + userId));

        return orderRepo.findAll()
                .stream()
                .filter(order -> order.getUser().getId() == user.getId())
                .toList();
    }

    // Update order status
    public Order updateOrderStatus(int id, OrderStatus status) {

        Order order = orderRepo.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Order not found: " + id));

        order.setStatus(status);

        return orderRepo.save(order);
    }

    // Cancel an order
    public Order cancelOrder(int id) {

        Order order = orderRepo.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Order not found: " + id));

        if (order.getStatus() == OrderStatus.SHIPPED
                || order.getStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException(
                    "Shipped or delivered orders cannot be cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);

        return orderRepo.save(order);
    }
}
