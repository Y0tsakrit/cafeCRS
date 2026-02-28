package com.cei.internetcafe.wallet.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreatePaymentRequest {
    // amount in satang
    private long amount;
}

