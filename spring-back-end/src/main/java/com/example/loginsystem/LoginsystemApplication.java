package com.example.loginsystem;

import com.example.loginsystem.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class LoginsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginsystemApplication.class, args);
	}

}
