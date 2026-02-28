package com.cei.internetcafe.user.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "\"Wallet\"")
public class WalletModel {


    @Id
    @Column(name = "\"userId\"")
    private Long userId;

    @Column(name = "\"amount\"")
    private float amount;

    @Column(name = "\"createdAt\"")
    private LocalDateTime createdAt;

    public WalletModel() {}

    public WalletModel(Long userId, float amount, LocalDateTime createdAt) {
        this.userId = userId;
        this.amount = amount;
        this.createdAt = createdAt;
    }

}