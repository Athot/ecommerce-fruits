package com.athot.springJourney.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    @RequestMapping("/")
    public String greet(){
        System.out.println("Athots here");
        return "Welcome to Athot world";
    }

    // about page
    @RequestMapping("/about")
    public String aboutPage(){
        return "This is about page";
    }
}
