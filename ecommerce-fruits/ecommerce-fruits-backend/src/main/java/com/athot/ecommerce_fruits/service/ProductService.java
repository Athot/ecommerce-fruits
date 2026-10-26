package com.athot.ecommerce_fruits.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.athot.ecommerce_fruits.dto.ProductResponse;
import com.athot.ecommerce_fruits.exception.ProductNotFoundException;
import com.athot.ecommerce_fruits.model.Product;
import com.athot.ecommerce_fruits.repository.ProductRepo;

@Service
public class ProductService {
    @Autowired
    private ProductRepo repo;


    public Product createProducts(Product product){
        return repo.save(product);
    }
        public List<ProductResponse> getAllProduct() {
        return repo.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    private ProductResponse convertToResponse(Product product) {
        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setDescription(product.getDescription());
        response.setBrand(product.getBrand());
        response.setPrice(product.getPrice());

        response.setCategoryId(product.getCategory().getId());
        response.setCategoryName(product.getCategory().getName());

        response.setReleaseDate(product.getReleaseDate());
        response.setAvailable(product.isAvailable());
        response.setQuantity(product.getQuantity());
        response.setActive(product.getActive());
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());

        return response;
    }

    public Product getProductsById(int id){
        return repo.findById(id).orElseThrow(() -> new ProductNotFoundException("Product not found" + id));
    }
    
    public Product updateProduct(int id, Product product){
        Product existingProduct = repo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));  
        existingProduct.setDescription(product.getDescription());
        existingProduct.setBrand(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setReleaseDate(product.getReleaseDate());
        existingProduct.setAvailable(product.isAvailable());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setActive(product.getActive());
        existingProduct.setDeleted(product.getDeleted()); 
        return repo.save(existingProduct);
    }


    public String deleteProducts(int id){
        Product existingProduct = repo.findById(id).orElseThrow(() -> new ProductNotFoundException("Product not deleted"));
         repo.delete(existingProduct);
         return "Product Deleted Successful";
    }
}
