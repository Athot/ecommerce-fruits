package com.athot.ecommerce_fruits.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.athot.ecommerce_fruits.model.Favourite;
import com.athot.ecommerce_fruits.service.FavouriteService;

@RestController 
@RequestMapping("api/favorites")
public class FavouriteController {
    
    @Autowired 
    private FavouriteService favouriteService;

    // add a product to favorites
    @PostMapping 
    public Favourite addFavourite(
        @RequestParam int userId, 
        @RequestParam  int productId   
    ){
    return favouriteService.addFavourite(userId, productId);  
    }

    
    // get all favorite for user
    @GetMapping("/user/{userId}")
    public List<Favourite> getUserFavourites(@PathVariable int userId){
        return favouriteService.getUserFavourites(userId);
    }

    // get favorite by id
    @GetMapping("/{id}")
    public Favourite getFavoriteById(@PathVariable  int id){
        return favouriteService.getFavoriteById(id);
    }

    // delete product from favorite
    @DeleteMapping("/{id}")
    public String deleteFavorite(@PathVariable  int id){
        return favouriteService.deleteFavorites(id);
    }
}
