package com.cei.internetcafe.wallet.controller;

import com.cei.internetcafe.wallet.service.WebhookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/webhook")
public class OmiseWebhookController {

    private final WebhookService webhookService;

    public OmiseWebhookController(WebhookService webhookService) {
        this.webhookService = webhookService;
    }

    @PostMapping("/omise")
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload,
            @RequestHeader(value = "Omise-Signature", required = false) String signature
    ) throws Exception {

        webhookService.processWebhook(payload, signature);

        return ResponseEntity.ok("received");
    }

}