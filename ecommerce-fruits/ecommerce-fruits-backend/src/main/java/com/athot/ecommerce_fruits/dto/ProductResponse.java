package com.athot.ecommerce_fruits.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

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
public class ProductResponse {
    private int id;
    private String description;
    private String brand;
    private BigDecimal price;
    private String imageUrl;
    private int categoryId;
    private String categoryName;
    private Date releaseDate;
    private boolean available;
    private int quantity;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
