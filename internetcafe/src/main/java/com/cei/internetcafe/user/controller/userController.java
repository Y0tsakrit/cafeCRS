package com.cei.internetcafe.user.controller;

import com.cei.internetcafe.user.dto.SignupRequest;
import com.cei.internetcafe.user.model.UserModel;
import com.cei.internetcafe.user.service.ProfileService;
import com.cei.internetcafe.user.service.UserService;
import com.cei.internetcafe.user.service.WalletService;
import com.cei.internetcafe.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class userController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private WalletService walletService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
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
        Map<String,String> token = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (token.containsKey("token")) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @Transactional
    @GetMapping("/balance")
    public Map<String,Float> getBalance(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Long userId = jwtUtil.extractClaims(token).get("id", Long.class);
        return Map.of("balance", walletService.getBalance(userId));
    }
}