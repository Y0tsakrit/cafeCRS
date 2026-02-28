package com.cei.internetcafe.wallet.controller;

import co.omise.models.Charge;
import com.cei.internetcafe.util.JwtUtil;
import com.cei.internetcafe.wallet.dto.CreatePaymentRequest;
import com.cei.internetcafe.wallet.service.PaymentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import io.jsonwebtoken.Claims;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;
    private final JwtUtil jwtUtil;

    public PaymentController(PaymentService paymentService, JwtUtil jwtUtil, ObjectMapper objectMapper) {
        this.paymentService = paymentService;
        this.jwtUtil = jwtUtil;
        objectMapper.registerModule(new JodaModule());
    }


    @PostMapping("/promptpay")
    public ResponseEntity<Charge> createPromptPay(
            @RequestBody CreatePaymentRequest body,
            @RequestHeader(value = "Authorization", required = false) String auth
    ) throws Exception {

        Long walletId = null;

        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);
            Claims claims = jwtUtil.extractClaims(token);
            walletId = Long.parseLong(claims.get("id").toString());
        }

        Charge resp = paymentService.createPromptPayCharge(body.getAmount(), walletId);

        return ResponseEntity.ok(resp);

    }
}