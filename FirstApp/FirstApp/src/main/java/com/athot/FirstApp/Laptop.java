package com.athot.FirstApp;

import org.springframework.stereotype.Component;

@Component
public class Laptop implements Computer{

    public Laptop(){
        System.out.println("Welcome to Laptop world");
    }
// implements Computer{
    
    public void compile(){
        System.out.println("Compiling  laptop");
    }    

}
