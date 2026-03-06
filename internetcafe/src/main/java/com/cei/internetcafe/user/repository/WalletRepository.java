package com.cei.internetcafe.user.repository;


import com.cei.internetcafe.user.model.WalletModel;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<WalletModel, Long> {
    boolean existsByUserIdAndAmountGreaterThanEqual(
            Long userId,
            float price
    );

    float getBalanceByUserId(Long userId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT w FROM WalletModel w WHERE w.userId = :userId")
    Optional<WalletModel> findByUserId(@Param("userId") Long userId);

}
