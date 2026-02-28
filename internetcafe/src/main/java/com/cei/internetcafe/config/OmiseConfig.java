package com.cei.internetcafe.config;

import co.omise.Client;
import co.omise.ClientException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OmiseConfig {

    @Value("${omise.secret-key}")
    private String secretKey;

    @Value("${omise.public-key}")
    private String publicKey;

    @Bean
    public Client client() throws ClientException {
        return new Client.Builder()
                .publicKey(publicKey)
                .secretKey(secretKey)
                .build();
    }
}