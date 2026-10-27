package com.athot.FirstApp;

// @Component
// public class Desktop implements Computer{
//     public void compile(){
//         System.out.println("I preffered Desktop");
//     }    
// }


public class Desktop implements Computer{
    // create constructor
    public Desktop(){
        System.out.println("Creating constructor in desktop");
    }


    public void compile(){
        System.out.println("Compile the desktop");
    }
}