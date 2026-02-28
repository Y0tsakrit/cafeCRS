package com.cei.internetcafe.wallet.repository;

import co.omise.models.Charge;
import co.omise.requests.Request;
import com.cei.internetcafe.wallet.model.PaymentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentModel, Long> {
    Optional<PaymentModel> findByChargeId(String chargeId);
}