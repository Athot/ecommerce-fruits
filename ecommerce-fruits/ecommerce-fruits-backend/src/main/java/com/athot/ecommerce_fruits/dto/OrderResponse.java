
package com.athot.ecommerce_fruits.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.athot.ecommerce_fruits.model.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {

    private int id;
    private int userId;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
