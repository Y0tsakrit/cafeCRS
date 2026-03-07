package com.cei.internetcafe.user.service;

import com.cei.internetcafe.user.model.ProfileModel;
import com.cei.internetcafe.user.model.UserModel;
import com.cei.internetcafe.user.model.WalletModel;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.user.repository.WalletRepository;
import com.cei.internetcafe.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;
    private final WalletRepository walletRepository;
    private final ProfileService profileService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, WalletRepository walletRepository, ProfileService profileService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.walletRepository = walletRepository;
        this.profileService = profileService;
    }

    public UserModel registerUser(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("User with email " + email + " already exists");
        }

        UserModel newUser = new UserModel();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password)); // Hash password
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setRole("USER");

        return userRepository.save(newUser);
    }

    public Map<String,String> loginUser(String email, String password) {
        UserModel user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            ProfileModel profile = profileService.getProfileById(user.getId());
            return jwtUtil.generateToken(user,profile);
        }
        return Map.of("error", "Invalid email or password");
    }

    public Optional<UserModel> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public UserModel getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserModel updateUser(UserModel user) {
        return userRepository.save(user);
    }

    public void updatePassword(Long userId,String oldPassword, String newPassword) {
        Optional<UserModel> userModel = userRepository.findById(userId);
        if(userModel.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        boolean isSamePassword = passwordEncoder.matches(oldPassword,userModel.get().getPassword());
        if (!isSamePassword) {
            throw new RuntimeException("Old password is incorrect");
        }

        String encodedPassword = passwordEncoder.encode(newPassword);
        userRepository.updatePasswordById(userId, encodedPassword);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}