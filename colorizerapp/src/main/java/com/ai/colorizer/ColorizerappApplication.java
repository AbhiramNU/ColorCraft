package com.ai.colorizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ColorizerappApplication {  

    @GetMapping("/hello")
    public String hello() {
        return "Spring Boot is running successfully!";
    }

    public static void main(String[] args) {    
        SpringApplication.run(ColorizerappApplication.class,args);
    }
}
