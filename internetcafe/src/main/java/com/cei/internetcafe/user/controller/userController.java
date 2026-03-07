package com.cei.internetcafe.user.controller;

import com.cei.internetcafe.user.dto.PasswordRequest;
import com.cei.internetcafe.user.dto.SignupRequest;
import com.cei.internetcafe.user.model.UserModel;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.user.service.ProfileService;
import com.cei.internetcafe.user.service.UserService;
import com.cei.internetcafe.user.service.WalletService;
import com.cei.internetcafe.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        try {
            UserModel newUser = userService.registerUser(signupRequest.getEmail(), signupRequest.getPassword());
            profileService.createProfile(signupRequest.getFname(), signupRequest.getLname(), newUser.getId());
            walletService.createWallet(newUser.getId());
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
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
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Long callerId = jwtUtil.extractClaims(token).get("id", Long.class);
        boolean isAdmin = userRepository.existsByIdAndRoleIgnoreCase(callerId, "ADMIN");
        if (!isAdmin) return ResponseEntity.status(403).body("Unauthorized");

        List<com.cei.internetcafe.user.model.UserModel> users = userRepository.findAll();
        List<Map<String, Object>> result = new java.util.ArrayList<>();
        for (com.cei.internetcafe.user.model.UserModel u : users) {
            com.cei.internetcafe.user.model.ProfileModel profile = profileService.getProfileById(u.getId());
            float balance = 0f;
            try { balance = walletService.getBalance(u.getId()); } catch (Exception ignored) {}
            String fname = profile != null && profile.getFName() != null ? profile.getFName() : "";
            String lname = profile != null && profile.getLName() != null ? profile.getLName() : "";
            String name = (fname + " " + lname).trim();
            Map<String, Object> row = new java.util.LinkedHashMap<>();
            row.put("id", u.getId());
            row.put("email", u.getEmail());
            row.put("name", name.isEmpty() ? u.getEmail() : name);
            row.put("role", u.getRole() != null ? u.getRole() : "USER");
            row.put("credit", balance);
            row.put("createdAt", u.getCreatedAt());
            result.add(row);
        }
        return ResponseEntity.ok(result);
    }

    @Transactional
    @GetMapping("/me")
    public ResponseEntity<?> getMe(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Long userId = jwtUtil.extractClaims(token).get("id", Long.class);
        com.cei.internetcafe.user.model.ProfileModel profile = profileService.getProfileById(userId);
        com.cei.internetcafe.user.model.UserModel user = userService.getUserById(userId).orElse(null);
        String fname = profile != null ? profile.getFName() : "";
        String lname = profile != null ? profile.getLName() : "";
        String name = (fname + " " + (lname != null ? lname : "")).trim();
        String email = user != null ? user.getEmail() : "";
        return ResponseEntity.ok(java.util.Map.of("fname", fname != null ? fname : "", "lname", lname != null ? lname : "", "name", name, "email", email));
    }

    @Transactional
    @GetMapping("/balance")
    public Map<String,Float> getBalance(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Long userId = jwtUtil.extractClaims(token).get("id", Long.class);
        return Map.of("balance", walletService.getBalance(userId));
    }

    @Transactional
    @PostMapping("/role")
    public ResponseEntity<?> updateUserRole(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @RequestBody Map<String, Object> body) {
        String token = authorizationHeader.substring(7);
        Long callerId = jwtUtil.extractClaims(token).get("id", Long.class);
        boolean isAdmin = userRepository.existsByIdAndRoleIgnoreCase(callerId, "ADMIN");
        if (!isAdmin) return ResponseEntity.status(403).body("Unauthorized");
        Long targetId = Long.valueOf(body.get("id").toString());
        String newRole = body.get("role").toString().toUpperCase();
        if (!newRole.equals("USER") && !newRole.equals("STAFF") && !newRole.equals("ADMIN")) {
            return ResponseEntity.badRequest().body("Invalid role");
        }
        UserModel target = userRepository.findById(targetId).orElse(null);
        if (target == null) return ResponseEntity.notFound().build();
        target.setRole(newRole);
        userRepository.save(target);
        return ResponseEntity.ok("Role updated");
    }

    @Transactional
    @PostMapping("/change-password")
    public String changePassword(@RequestHeader(value = "Authorization") String authorizationHeader, @RequestBody PasswordRequest passwordRequest) {
        String token = authorizationHeader.substring(7);
        Long userId = jwtUtil.extractClaims(token).get("id", Long.class);
        userService.updatePassword(userId, passwordRequest.getOldPassword(), passwordRequest.getNewPassword());
        return "Password changed successfully";
    }
}