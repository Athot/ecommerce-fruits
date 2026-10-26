package com.athot.ecommerce_fruits.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.athot.ecommerce_fruits.model.Category;
import com.athot.ecommerce_fruits.repository.CategoryRepo;

@Service 
public class CategoryService {
    @Autowired 
    private CategoryRepo categoryRepo; 

    // create category
    public Category createCategory(Category category){
        return categoryRepo.save(category);
    }

    // get all category
    public List<Category> getAllCategory(){
        return categoryRepo.findAll();
    }

    // get category by id
    public Category getCategoryById(int id){
        return categoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Category not found " + id));

    }

    // update category
    public Category updateCategory(int id, Category category){
        Category exisitingCategory = categoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Category not found " + id));
        exisitingCategory.setName(category.getName());
        exisitingCategory.setDescription(category.getDescription());
        exisitingCategory.setActive(category.isActive());    
        return categoryRepo.save(exisitingCategory);
    }

    // delete category
    public String deleteCategory(int id){
        Category existingCategory = categoryRepo.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Category not found: " + id));
        categoryRepo.delete(existingCategory);
        return "Category deleted successfully";
    }
}
