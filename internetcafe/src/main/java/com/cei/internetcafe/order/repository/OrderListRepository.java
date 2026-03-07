package com.cei.internetcafe.order.repository;

import com.cei.internetcafe.order.model.OrderListModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderListRepository extends JpaRepository<OrderListModel, Long> {
    List<OrderListModel> findAllByOrderId(Long orderId);
    List<OrderListModel> findAllByOrderIdIn(List<Long> orderIds);
}