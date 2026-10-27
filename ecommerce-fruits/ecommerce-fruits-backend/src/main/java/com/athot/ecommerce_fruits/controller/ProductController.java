package com.athot.ecommerce_fruits.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.athot.ecommerce_fruits.dto.ProductResponse;
import com.athot.ecommerce_fruits.model.Product;
import com.athot.ecommerce_fruits.service.ProductService;
import org.springframework.http.MediaType; 
@RestController
@RequestMapping("/api")
public class ProductController {

    // this is for get and set
    @Autowired
    private ProductService service;


   @PostMapping(
    value = "/products",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public Product createProducts(
        @RequestPart("product") Product product,
        @RequestPart("image") MultipartFile image
) throws Exception {

    return service.createProducts(product, image);
}
    // create method which will release list of the product
    @GetMapping("/products")
    public List<ProductResponse> getAllProducts(){
    return service.getAllProduct();
    }

    // get the product by id
    @GetMapping("/products/{id}")
    public Product getProductById(@PathVariable int id) {
        return service.getProductsById(id);
    }

    // update 
    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable int id, @RequestBody Product product){
        return service.updateProduct(id, product);
    }
    // delete
    @DeleteMapping("/products/{id}")
    public String deleteProducts(@PathVariable int id){
        return  service.deleteProducts(id);
    }

}
