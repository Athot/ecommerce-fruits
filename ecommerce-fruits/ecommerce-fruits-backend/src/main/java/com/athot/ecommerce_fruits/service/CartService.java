package com.athot.ecommerce_fruits.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.athot.ecommerce_fruits.model.Cart;
import com.athot.ecommerce_fruits.model.Product;
import com.athot.ecommerce_fruits.model.User;
import com.athot.ecommerce_fruits.repository.CartRepo;
import com.athot.ecommerce_fruits.repository.ProductRepo;
import com.athot.ecommerce_fruits.repository.UserRepo;
@Service 
public class CartService {
    @Autowired 
    private CartRepo cartRepo;

    @Autowired 
    private ProductRepo productRepo;

    @Autowired 
    private UserRepo userRepo;

    // add product to cart
    public Cart addToCart(int userId, int productId, int quantity){
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        // validate a requested quantiy
        if(quantity <= 0){
            throw new RuntimeException("Quantity must be greater than zero");
        }

        // check available stock
        if(quantity > product.getQuantity()){
            throw new RuntimeException(
                "Insufficient stock. Available quantity: " + product.getQuantity()
            );
        }
        Cart cart = new Cart(); 
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(quantity);
        
        BigDecimal totalPrice = product.getPrice().multiply(BigDecimal.valueOf(quantity));
        cart.setTotalPrice(totalPrice);
        
        return cartRepo.save(cart);
    }

    // get all cart items for a user
    public List<Cart> getUserCarts(int userId){
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepo.findByUser(user);
    }

    // get cart items by id
    public Cart getCartById(int cartId){
        return cartRepo.findById(cartId).orElseThrow(() -> new RuntimeException("Cart item not found"));
    }

    // update quantity
    public Cart updateCart(int id, int quantity){
        Cart existingCart = cartRepo.findById(id).orElseThrow(() -> new RuntimeException("Cart item not found"));
        existingCart.setQuantity(quantity);
        BigDecimal totalPrice = existingCart.getProduct().getPrice().multiply(BigDecimal.valueOf(quantity));

        existingCart.setTotalPrice(totalPrice);
        return cartRepo.save(existingCart);
    }


    // remove item from cart
    public String deleteCart(int id){
        Cart existingCart = cartRepo.findById(id).orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartRepo.delete(existingCart);
        return "Cart item deleted successfully";
    }
}
