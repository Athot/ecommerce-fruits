package com.athot.ecommerce_fruits.dto;

import java.math.BigDecimal;
import java.util.List;

public class OrderItemResponse {
    private int productId;
    private String productName;
    private List<String> images;
    private int quantity;
    private BigDecimal price;
    private BigDecimal subtotal;

}
