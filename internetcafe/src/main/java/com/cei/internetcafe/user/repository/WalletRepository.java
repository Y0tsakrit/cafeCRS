package com.cei.internetcafe.user.repository;


import com.cei.internetcafe.user.model.WalletModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<WalletModel, Long> {
    boolean existsByUserIdAndAmountGreaterThanEqual(
            Long userId,
            float price
    );
}
