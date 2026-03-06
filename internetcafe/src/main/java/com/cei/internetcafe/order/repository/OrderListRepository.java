package com.cei.internetcafe.order.repository;

import com.cei.internetcafe.order.model.OrderListModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderListRepository extends JpaRepository<OrderListModel, Long> {
}