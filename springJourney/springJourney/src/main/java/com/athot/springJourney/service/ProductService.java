package com.athot.springJourney.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.athot.springJourney.Repository.ProductRepo;
import com.athot.springJourney.model.Product;

@Service
public class ProductService {
//  create dummy data 
// List<Product> products =new ArrayList<>(List.of(new Product(101, "Iphone", 5000),
// new Product(102, "Nikon", 6000)));
 
    @Autowired
    ProductRepo repo;


public List<Product> getProducts(){
        return repo.findAll();
    }

    // get product by id 
    public Product getProdById(int prodId){
        // return products.stream().filter(p -> p.getProdId() ==  prodId).findFirst().orElse(new Product(100, "No item present", 0));
        return repo.findById(prodId).orElse(new Product(prodId, "Not found", prodId));
    }

    //put data inside the products
    public void addProducts(Product prod){
        repo.save(prod);
        // products.add(prod);
    } 


    // update the products
    public void updateProducts(Product prod){
        repo.save(prod);
        // int index = 0;
        //  for(int i  = 0; i < products.size(); i++){
        //     if(products.get(i).getProdId() == prod.getProdId());
        //     index = i;


        // products.set(index, prod);
        // } 
    
    
    }


    // delete the product
    public void deleteProduct(int prodId){
        repo.deleteById(prodId);
        // int index = 0;
        // for(int i =0; i < products.size(); i++){
        //     if(products.get(i).getProdId() == prodId);
        //     index = i;

        // products.remove(index);
        // }
    }
}
