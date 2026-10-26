package com.athot.ecommerce_fruits.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor 
@Entity 
@Table(
    uniqueConstraints = {
        @UniqueConstraint (
            columnNames = {"user_id" , "product_id"}
        )
    }
)
public class Favourite {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne 
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne  
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @CreationTimestamp 
    @Column(updatable = false)
    private LocalDateTime createdAt;

}
