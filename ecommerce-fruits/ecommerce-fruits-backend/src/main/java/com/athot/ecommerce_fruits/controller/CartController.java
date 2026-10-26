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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.athot.ecommerce_fruits.dto.AddCartRequest;
import com.athot.ecommerce_fruits.model.Cart;
import com.athot.ecommerce_fruits.service.CartService;

@RestController
@RequestMapping("/api/cart") 
public class CartController {
     @Autowired 
     private CartService cartService;

    //  add product to cart
    @PostMapping("/add-cart")
    public Cart addToCart( @RequestBody AddCartRequest request
    ){
        return cartService.addToCart(request.getUserId(), 
        request.getProductId(),
        request.getQuantity());
    }
     
    // get user's cart
    @GetMapping("/cart/user/{userId}")
    public List<Cart> getUserCarts(@PathVariable int userId
    ){
        return cartService.getUserCarts(userId);
    }

    // get cart by id
    @GetMapping("/cart/{id}")
    public Cart getCartById(
        @PathVariable  int id
    ){
        return cartService.getCartById(id);
    }

    // update cart quantity
    @PutMapping("/cart/{id}")
    public Cart updateCart(
        @PathVariable  int id,
        @RequestParam  int quantity
    ){
        return cartService.updateCart(id, quantity);
    }

    // delete cart item
    @DeleteMapping("/cart/{id}")
        public String deleteCart(@PathVariable int id){
            return cartService.deleteCart(id);
        
    }
}
