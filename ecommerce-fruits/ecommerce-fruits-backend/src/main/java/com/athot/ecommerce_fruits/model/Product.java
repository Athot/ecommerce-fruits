package com.athot.ecommerce_fruits.model;
import java.math.BigDecimal;
import java.sql.Date; 
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne; 
import lombok.Data;
import lombok.NoArgsConstructor;
@Data 
@NoArgsConstructor
@Entity 
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    private String brand;
    @Column(name = "image_url")
    private String imageUrl;
    private BigDecimal price;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    private Date releaseDate;
    private boolean available;
    private int quantity;
    private Boolean active = true;
    private Boolean deleted = false;   
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
