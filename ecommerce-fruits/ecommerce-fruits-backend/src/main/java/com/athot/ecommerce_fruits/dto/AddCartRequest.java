package com.athot.ecommerce_fruits.dto;

import lombok.Data;

@Data 
public class AddCartRequest {
    private int userId;
    private int productId;
    private int quantity;  
}  
