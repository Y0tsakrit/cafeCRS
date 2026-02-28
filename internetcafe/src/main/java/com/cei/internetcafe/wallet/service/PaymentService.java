package com.cei.internetcafe.wallet.service;

import co.omise.Client;
import co.omise.models.Charge;
import co.omise.models.Source;
import co.omise.models.SourceType;
import co.omise.requests.Request;
import com.cei.internetcafe.wallet.model.PaymentModel;
import com.cei.internetcafe.wallet.repository.PaymentRepository;
import com.cei.internetcafe.user.repository.WalletRepository;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class PaymentService {

    private final Client client;


    private final PaymentRepository paymentRepository;
    private final ObjectMapper objectMapper;

    public PaymentService(Client client, PaymentRepository paymentRepository, WalletRepository walletRepository, PaymentRepository paymentRepository1, ObjectMapper objectMapper) {
        this.client = client;
        this.paymentRepository = paymentRepository1;
        this.objectMapper = objectMapper;
    }

    public Charge createPromptPayCharge(long amountSatang, long walletId) throws Exception {
        Request<Source> sourceRequest =
                new Source.CreateRequestBuilder()
                        .type(SourceType.PromptPay)
                        .amount(amountSatang)
                        .currency("thb")
                        .build();

        Source source = client.sendRequest(sourceRequest);

        Request<Charge> chargeRequest =
                new Charge.CreateRequestBuilder()
                        .amount(amountSatang)
                        .currency("thb")
                        .source(source.getId())
                        .build();


        Charge charge = client.sendRequest(chargeRequest);
        String chargeJson = objectMapper.writeValueAsString(charge);

        PaymentModel payment = new PaymentModel();
        payment.setAmount(amountSatang);
        payment.setWalletId(walletId);
        payment.setMetaData(chargeJson);
        payment.setChargeId(charge.getId());
        payment.setCreatedAt(java.time.LocalDateTime.now());

        paymentRepository.save(payment);

        return charge;

    }
}
