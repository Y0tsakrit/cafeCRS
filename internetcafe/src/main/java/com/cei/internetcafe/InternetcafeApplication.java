package com.cei.internetcafe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collections;

@SpringBootApplication
public class InternetcafeApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(InternetcafeApplication.class);
		// Uncomment the line below to set port programmatically
		 app.setDefaultProperties(Collections.singletonMap("server.port", "8080"));
		app.run(args);
	}

}
