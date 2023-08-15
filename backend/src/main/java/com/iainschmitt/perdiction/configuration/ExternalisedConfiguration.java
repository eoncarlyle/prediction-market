package com.iainschmitt.perdiction.configuration;

import java.nio.charset.StandardCharsets;
import java.security.Key;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.security.Keys;

import com.iainschmitt.perdiction.model.User;
import com.iainschmitt.perdiction.repository.UserRepository;
import com.iainschmitt.perdiction.service.UserService;


@Configuration
@EnableScheduling
public class ExternalisedConfiguration {
    //! This assumes that the admin, bank user documents have already created at runtime
    @Value("${adminEmail}")
    private String adminEmail;
    @Value("${bankEmail}")
    private String bankEmail;
    @Value("${secret}")
    private String secret;
    @Value("${marketCloseIntervalMinutes}")
    private String marketCloseIntervalMinutes;

    public String getAdminEmail() {
        return adminEmail;
    }
    
    public String getBankEmail() {
        return bankEmail;
    }

    public Key getKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public long getMarketCloseIntervalMinutes() {
        return Long.valueOf(marketCloseIntervalMinutes);
    }
}
