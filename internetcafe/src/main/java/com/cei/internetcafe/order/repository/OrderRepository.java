package com.cei.internetcafe.order.repository;

import com.cei.internetcafe.order.model.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {
}