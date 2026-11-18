
package com.athot.ecommerce_fruits.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.athot.ecommerce_fruits.dto.ProductResponse;
import com.athot.ecommerce_fruits.dto.ProductUpdateRequest;
import com.athot.ecommerce_fruits.exception.ProductNotFoundException;
import com.athot.ecommerce_fruits.model.Category;
import com.athot.ecommerce_fruits.model.Product;
import com.athot.ecommerce_fruits.repository.CategoryRepo;
import com.athot.ecommerce_fruits.repository.ProductRepo;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    @Autowired 
    private CategoryRepo categoryRepo;
    // CREATE PRODUCT WITH MULTIPLE IMAGES
    public Product createProducts(Product product, List<MultipartFile> images) throws Exception {

        List<String> imageUrls = new ArrayList<>();

        if (images != null) {
            for (MultipartFile image : images) {

                if (image == null || image.isEmpty()) {
                    continue;
                }

                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

                Path uploadPath = Paths.get("uploads/products")
                        .toAbsolutePath()
                        .normalize();

                Files.createDirectories(uploadPath);

                Path filePath = uploadPath.resolve(fileName).normalize();

                if (!filePath.startsWith(uploadPath)) {
                    throw new IllegalArgumentException("Invalid file path");
                }

                Files.copy(
                        image.getInputStream(),
                        filePath,
                        StandardCopyOption.REPLACE_EXISTING
                );

                imageUrls.add("/uploads/products/" + fileName);
            }
        }

        product.setImages(imageUrls);

        return repo.save(product);
    }

    // GET ALL PRODUCTS
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProduct() {

        return repo.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // CONVERT PRODUCT TO RESPONSE DTO
    private ProductResponse convertToResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setDescription(product.getDescription());
        response.setBrand(product.getBrand());
        response.setPrice(product.getPrice());

        response.setImages(product.getImages() == null || product.getImages().isEmpty()
            ? List.of() 
            : product.getImages());

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

    // GET PRODUCT BY ID
    @Transactional(readOnly = true)
    public ProductResponse getProductsById(int id) {

        Product product = repo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found: " + id));

        return convertToResponse(product);
    }

// UPDATE PRODUCT WITH MULTIPLE IMAGES
public ProductResponse updateProduct(
        int id,
        ProductUpdateRequest product,
        List<MultipartFile> newImages
) throws Exception {

    Product existingProduct = repo.findById(id)
        .orElseThrow(() ->
            new ProductNotFoundException("Product not found: " + id));

    // Find category using categoryId
    Category category = categoryRepo.findById(product.getCategoryId())
        .orElseThrow(() ->
            new RuntimeException("Category not found"));

    // Update product details
    existingProduct.setDescription(product.getDescription());
    existingProduct.setBrand(product.getBrand());
    existingProduct.setPrice(product.getPrice());
    existingProduct.setCategory(category);
    existingProduct.setReleaseDate(product.getReleaseDate());
    existingProduct.setAvailable(product.isAvailable());
    existingProduct.setQuantity(product.getQuantity());
    existingProduct.setActive(product.getActive());
    existingProduct.setDeleted(product.getDeleted());

    // Keep existing images selected by admin
    List<String> updatedImages = new ArrayList<>();

    if (product.getImages() != null) {
        updatedImages.addAll(product.getImages());
    }

    // Upload new images
    if (newImages != null) {
        for (MultipartFile image : newImages) {

            if (image == null || image.isEmpty()) {
                continue;
            }

            String fileName = UUID.randomUUID() + "_"
                    + image.getOriginalFilename();

            Path uploadPath = Paths.get("uploads/products")
                    .toAbsolutePath()
                    .normalize();

            Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(fileName).normalize();

            if (!filePath.startsWith(uploadPath)) {
                throw new IllegalArgumentException("Invalid file path");
            }

            Files.copy(
                image.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING
            );

            updatedImages.add("/uploads/products/" + fileName);
        }
    }

    existingProduct.setImages(updatedImages);

    Product savedProduct = repo.save(existingProduct);

    return convertToResponse(savedProduct);
}


    // DELETE PRODUCT
    public String deleteProducts(int id) {

        Product existingProduct = repo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found: " + id));

        repo.delete(existingProduct);

        return "Product Deleted Successfully";
    }
}
