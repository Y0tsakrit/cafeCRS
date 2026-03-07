package com.cei.internetcafe.user.service;

import com.cei.internetcafe.user.model.WalletModel;
import com.cei.internetcafe.user.repository.WalletRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService {
    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    public WalletModel createWallet(Long userId) {
        WalletModel wallet = new WalletModel(userId, 0.0f, java.time.LocalDateTime.now());
        return walletRepository.save(wallet);
    }

    public Float getBalance(Long userId) {
        Optional<WalletModel> wallet = walletRepository.findByUserId(userId);
        if (wallet.isEmpty()) {
            throw new RuntimeException("Wallet not found for user");
        }
        return wallet.get().getAmount();
    }
}