package com.api.productsapi.controllers;

import com.api.productsapi.models.Product;
import com.api.productsapi.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<Object> getAllProducts(){
        return ResponseEntity.status(HttpStatus.OK).body(productRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getProduct(@PathVariable Long id){
        Optional<Product> productOptional = productRepository.findById(id);

        if(productOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(productOptional.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

    }

    @PostMapping
    public ResponseEntity<Object> createProduct(@RequestBody Product product){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(product));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateProduct(@RequestBody Product product, @PathVariable long id){
        try{

            Optional<Product> productOptional = productRepository.findById(id);

            if(productOptional.isPresent()){

                Product productUpdate = productOptional.get();
                productUpdate.setName(product.getName());
                productUpdate.setUrl(product.getUrl());
                productUpdate.setToken(product.getToken());
                productUpdate.setDescription(product.getDescription());

                return ResponseEntity.status(HttpStatus.OK).body(productRepository.save(productUpdate));
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable long id){
        try{

            Optional<Product> productOptional = productRepository.findById(id);

            if(productOptional.isPresent()){
                productRepository.deleteById(id);
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}
