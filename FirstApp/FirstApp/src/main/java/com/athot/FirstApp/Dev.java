package com.athot.FirstApp;
import org.springframework.stereotype.Component;

@Component
public class Dev {

    private Computer com;

    
    public Dev(){
        System.out.println("Dev Consturtor");
    }

      public Computer getCom(){
        return com;
    }
  
    public void setCom(Computer com){
        this.com = com;
    }


      
    

    public void build(){
        com.compile();
        System.out.println("I'm so happy to start my journey with SPRING BOOT");
    }
}
