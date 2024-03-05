package com.jaisoft.configmap.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    @Value("${my.system.property:defaultValue}")
    protected String fromSystem;
    
    @GetMapping("/greetings")
    public String greetings() {
         return "I'm saying hello to Kubernetes with system property "+fromSystem+" !";
    }
    
}


 
