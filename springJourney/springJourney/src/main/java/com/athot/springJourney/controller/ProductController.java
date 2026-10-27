package com.athot.springJourney.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.athot.springJourney.model.Product;
import com.athot.springJourney.service.ProductService;

@RestController
public class ProductController {
    @Autowired
    ProductService service;

    @RequestMapping("/products")
    public List<Product> getProducts(){
        return service.getProducts();
    }
    

    @RequestMapping("/products/{prodId}")
    public Product getProdById(@PathVariable int prodId){
        return service.getProdById(prodId);
    }

    // add products 
    @PostMapping("/products")
    public void addProducts(@RequestBody Product prod){   
        
        if(prod == null){
             ResponseEntity.badRequest().body("Product is null");
        }
        service.addProducts(prod);
    }

    // update 
    @PutMapping("/products")
    public void updateProducts(@RequestBody Product prod){
        
       service.updateProducts(prod);
       
    }

    // delete
    @DeleteMapping("/products/{prodId}")
    public void deleteProduct(@PathVariable int prodId){
        service.deleteProduct(prodId);
    }
}
