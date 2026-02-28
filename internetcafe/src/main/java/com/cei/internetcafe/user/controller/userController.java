package com.cei.internetcafe.user.controller;

import com.cei.internetcafe.user.dto.SignupRequest;
import com.cei.internetcafe.user.model.UserModel;
import com.cei.internetcafe.user.service.ProfileService;
import com.cei.internetcafe.user.service.UserService;
import com.cei.internetcafe.user.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class userController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private WalletService walletService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        System.out.println("Received signup request: " + signupRequest.getEmail());
        try {
            UserModel newUser = userService.registerUser(signupRequest.getEmail(), signupRequest.getPassword());
            profileService.createProfile(signupRequest.getFname(), signupRequest.getLname(), newUser.getId());
            walletService.createWallet(newUser.getId());
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            System.out.println("Error: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody SignupRequest loginRequest) {
        System.out.println("Received login request: " + loginRequest.getEmail());
        Object token = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (token instanceof String) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}