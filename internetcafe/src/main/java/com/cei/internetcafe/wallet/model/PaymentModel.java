package com.cei.internetcafe.wallet.model;

import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "\"Payment\"")
public class PaymentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "\"walletId\"", nullable = false)
    private Long walletId;

    @Column(name = "\"amount\"", nullable = false)
    private Long amount;

    @Type(JsonType.class)
    @Column(name = "\"metaData\"", columnDefinition = "jsonb")
    private String metaData;

    @Column(name = "\"chargeId\"", nullable = false)
    private String chargeId;

    @Column(name = "\"createdAt\"", nullable = false)
    private LocalDateTime createdAt;

    public PaymentModel() {}

    public PaymentModel(Long walletId,String chargeId, Long amount, String metaData) {
        this.walletId = walletId;
        this.amount = amount;
        this.metaData = metaData;
        this.chargeId = chargeId;
        this.createdAt = LocalDateTime.now();
    }

}