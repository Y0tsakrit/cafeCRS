package com.cei.internetcafe.user.service;

import com.cei.internetcafe.user.model.UserModel;
import com.cei.internetcafe.user.model.WalletModel;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.user.repository.WalletRepository;
import com.cei.internetcafe.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private WalletRepository walletRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserModel registerUser(String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("User with email " + email + " already exists");
        }

        UserModel newUser = new UserModel();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password)); // Hash password
        newUser.setCreatedAt(LocalDateTime.now());

        return userRepository.save(newUser);
    }

    public Object loginUser(String email, String password) {
        UserModel user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return jwtUtil.generateToken(user);
        }
        return Optional.empty();
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

    public void updatePassword(Long userId, String newPassword) {
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