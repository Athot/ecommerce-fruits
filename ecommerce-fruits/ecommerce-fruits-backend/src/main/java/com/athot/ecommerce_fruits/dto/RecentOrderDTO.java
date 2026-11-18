package com.athot.ecommerce_fruits.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor 
public class RecentOrderDTO {
    private int orderId;
    private String customerName;
    private List<String> product;
    private BigDecimal amount;
    private String status;
    
}
