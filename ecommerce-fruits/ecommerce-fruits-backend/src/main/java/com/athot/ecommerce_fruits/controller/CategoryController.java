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
import org.springframework.web.bind.annotation.RestController;

import com.athot.ecommerce_fruits.model.Category;
import com.athot.ecommerce_fruits.service.CategoryService;

@RestController 
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired 
    private CategoryService categoryService;
    // create category
    @PostMapping
    private Category createCategory(@RequestBody Category category){
        return categoryService.createCategory(category);
    }
    @GetMapping 
    private List<Category> getCategory(){
        return categoryService.getAllCategory();
    }

    @GetMapping("/{id}")
    private Category getCategoryById(@PathVariable int id){
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/{id}")
    private Category updateCategory(@PathVariable int id,
        @RequestBody Category category
    ){
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    private String deleteCategory(@PathVariable  int id){
        return categoryService.deleteCategory(id);
    } 
}
