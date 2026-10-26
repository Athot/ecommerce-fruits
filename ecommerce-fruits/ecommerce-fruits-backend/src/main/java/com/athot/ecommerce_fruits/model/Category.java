package com.athot.ecommerce_fruits.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id; 
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@JsonIgnoreProperties ({"hibernateLazyInitializer", "handler"})
@Entity 
public class Category {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private boolean active = true;
}
