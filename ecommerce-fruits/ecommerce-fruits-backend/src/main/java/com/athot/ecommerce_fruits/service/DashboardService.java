package com.athot.ecommerce_fruits.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.athot.ecommerce_fruits.dto.DashboardResponse;
import com.athot.ecommerce_fruits.dto.RecentOrderDTO;
import com.athot.ecommerce_fruits.model.Role;
import com.athot.ecommerce_fruits.repository.OrderRepo;
import com.athot.ecommerce_fruits.repository.UserRepo; 

@Service 
public class DashboardService {
    
    @Autowired 
    private OrderRepo orderRepo; 

    @Autowired 
    private UserRepo userRepo;

    @Transactional (readOnly = true)
    public DashboardResponse getDashboardResponse(){
        long totalOrders = orderRepo.count();
        BigDecimal totalAmount = orderRepo.getTotalOrderAmount();
        long totalProducts = orderRepo.count();
        long totalCustomers = userRepo.countByRole(Role.USER);
        List<RecentOrderDTO> recentOrders =  
        orderRepo.findTop5ByOrderByCreatedAtDesc()
        .stream().map(order ->  new RecentOrderDTO(
                order.getId(),
                order.getFullName(),
                order.getOrderItems()
                .stream()
                .map(item -> item.getProduct().getBrand())
                .distinct()
                .toList(),
                 order.getTotalAmount(),
                order.getStatus().toString()
            ))
                .toList();
 

                return new DashboardResponse(totalOrders, totalAmount, totalProducts, totalCustomers,
                    recentOrders
                ); 
       
    }
}
