
package com.athot.ecommerce_fruits.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private long totalOrders;
    private BigDecimal totalAmount;
    private long totalProducts;
    private long totalCustomers;

    private List<RecentOrderDTO> recentOrders;
}
