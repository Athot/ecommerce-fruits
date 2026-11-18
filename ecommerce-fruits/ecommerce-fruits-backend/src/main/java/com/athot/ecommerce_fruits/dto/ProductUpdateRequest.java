
package com.athot.ecommerce_fruits.dto;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import lombok.Data;

@Data
public class ProductUpdateRequest {

    private String description;
    private String brand;
    private BigDecimal price;
    private Integer categoryId;
    private Date releaseDate;
    private boolean available;
    private int quantity;
    private Boolean active;
    private Boolean deleted;
    private List<String> images;
}
