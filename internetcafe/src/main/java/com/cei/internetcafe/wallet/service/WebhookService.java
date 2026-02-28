package com.cei.internetcafe.wallet.service;

import com.cei.internetcafe.user.model.WalletModel;
import com.cei.internetcafe.user.repository.WalletRepository;
import com.cei.internetcafe.wallet.model.PaymentModel;
import com.cei.internetcafe.wallet.repository.PaymentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WebhookService {

    private final PaymentRepository paymentRepository;
    private final ObjectMapper objectMapper;
    private final WalletRepository walletRepository;

    public WebhookService(PaymentRepository paymentRepository,
                          ObjectMapper objectMapper, WalletRepository walletRepository) {
        this.paymentRepository = paymentRepository;
        this.objectMapper = objectMapper;
        this.walletRepository = walletRepository;
    }

    public void processWebhook(String payload, String signature) throws Exception {

        System.out.println("Webhook endpoint hit");
        System.out.println("Raw payload: " + payload);

        JsonNode root = objectMapper.readTree(payload);

        if (root.get("key") == null) {
            System.out.println("Invalid webhook. No key found.");
            return;
        }

        String eventType = root.get("key").asText();
        System.out.println("Event type: " + eventType);

        if (!eventType.equals("charge.complete") &&
                !eventType.equals("charge.failed")) {
            System.out.println("Ignored event type");
            return;
        }

        JsonNode chargeNode = root.get("data");

        if (chargeNode == null) {
            System.out.println("No data object found.");
            return;
        }

        String chargeId = chargeNode.get("id").asText();
        String status = chargeNode.get("status").asText();
        long amount = chargeNode.get("amount").asLong();

        System.out.println("Webhook received for chargeId: " + chargeId);
        System.out.println("Status: " + status);
        System.out.println("Amount: " + amount);

        Optional<PaymentModel> optional =
                paymentRepository.findByChargeId(chargeId);

        if (optional.isEmpty()) {
            System.out.println("Payment not found for chargeId: " + chargeId);
            return;
        }

        PaymentModel payment = optional.get();

        payment.setMetaData(payload);
        paymentRepository.save(payment);

        System.out.println("Payment updated successfully.");

        if (status.equals("successful")) {
            System.out.println("Charge successful. Credit wallet here.");
            Optional<PaymentModel> paymentSuccess = paymentRepository.findByChargeId(chargeId);
            WalletModel wallet = walletRepository.findById(paymentSuccess.get().getWalletId()).orElseThrow();
            wallet.setAmount(wallet.getAmount() + ((float) paymentSuccess.get().getAmount() / 100));
            walletRepository.save(wallet);
        }

        if (status.equals("failed")) {
            System.out.println("Charge failed.");
        }

    }

}