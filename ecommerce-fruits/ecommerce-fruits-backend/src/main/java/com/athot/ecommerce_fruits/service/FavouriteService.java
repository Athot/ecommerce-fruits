package com.athot.ecommerce_fruits.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 
import org.springframework.web.bind.annotation.PathVariable;

import com.athot.ecommerce_fruits.model.Favourite;
import com.athot.ecommerce_fruits.model.Product;
import com.athot.ecommerce_fruits.model.User;
import com.athot.ecommerce_fruits.repository.FavouriteRepo;
import com.athot.ecommerce_fruits.repository.ProductRepo;
import com.athot.ecommerce_fruits.repository.UserRepo;

@Service 
public class FavouriteService {
    
    @Autowired 
    private FavouriteRepo favouriteRepo;

    @Autowired 
    private UserRepo userRepo;

    @Autowired 
    private  ProductRepo productRepo;

    // add product to favorites
    public Favourite addFavourite(int userId, int productId){
        User user = userRepo.findById(userId).orElseThrow(
            () -> new RuntimeException("User not found")
        );

        Product product = productRepo.findById(productId).orElseThrow(
            () -> new RuntimeException("Product not found")
        );

        // prevent duplicate favorites
        return favouriteRepo.findByUserAndProduct(user, product).orElseGet(
            () -> {
                Favourite favourite = new Favourite();
                favourite.setUser(user);
                favourite.setProduct(product);
            return favouriteRepo.save(favourite);
            }
        );
    }
 
    
    // get all favorite for user 
    public List<Favourite> getUserFavourites(@PathVariable int userId){
         User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("Favorite not found")); 
         return favouriteRepo.findByUser(user);
    }

    // get favorite by id
    public Favourite getFavoriteById(int id){
        return favouriteRepo.findById(id).orElseThrow(() -> new RuntimeException("Favorite not found"));

    }
    
    // remove favorites
    public String deleteFavorites(int id){
        Favourite favourite = favouriteRepo.findById(id).orElseThrow(() -> new RuntimeException("Favorite not found"));
        favouriteRepo.delete(favourite);
        return "Favorite removed successfully";
    }
}
