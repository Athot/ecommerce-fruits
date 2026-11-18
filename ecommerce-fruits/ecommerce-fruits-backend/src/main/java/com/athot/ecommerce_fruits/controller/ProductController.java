package com.athot.ecommerce_fruits.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.athot.ecommerce_fruits.dto.ProductResponse;
import com.athot.ecommerce_fruits.dto.ProductUpdateRequest;
import com.athot.ecommerce_fruits.dto.UserResponseDTO;
import com.athot.ecommerce_fruits.model.Product;
import com.athot.ecommerce_fruits.service.ProductService;
import com.athot.ecommerce_fruits.service.UserService;

import org.springframework.http.MediaType; 
@RestController
@RequestMapping("/api")
public class ProductController {

    // this is for get and set
    @Autowired
    private ProductService service;
  @Autowired
    private UserService userService;
    @PostMapping(
       value = "/products",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public Product createProducts(
    @RequestPart("product") Product product,
    @RequestPart("images") List<MultipartFile> images
) throws Exception {

    return service.createProducts(product, images);
}
    // create method which will release list of the product
    @GetMapping("/products")
    public List<ProductResponse> getAllProducts(){
    return service.getAllProduct();
    }

    // get the product by id
    @GetMapping("/products/{id}")
    public ProductResponse getProductById(@PathVariable int id) {
        return service.getProductsById(id);
    }

    @PutMapping(
    value = "/products/{id}",
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
)
public ProductResponse updateProduct(
    @PathVariable int id,
    @RequestPart("product") ProductUpdateRequest product,
    @RequestPart(value = "images", required = false)
    List<MultipartFile> images
) throws Exception {

    return service.updateProduct(id, product, images);
}
    @GetMapping("/users")
    public List<UserResponseDTO> getAllUser(){
        return userService.getUser();
    }
}
