package com.athot.ecommerce_fruits.model;
 

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table; 
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name ="users")
@Data
@NoArgsConstructor 


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    private String name;
    @Column(unique = true)
    private String email;

    private String password; 
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
}
