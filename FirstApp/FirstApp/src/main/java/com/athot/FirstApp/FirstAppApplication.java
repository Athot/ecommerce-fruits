package com.athot.FirstApp;

// import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class FirstAppApplication {

	public static void main(String[] args) {
		// we have to call the dev method here
		ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");
		Dev obj = (Dev) context.getBean("dev");
		obj.build();
}

}
