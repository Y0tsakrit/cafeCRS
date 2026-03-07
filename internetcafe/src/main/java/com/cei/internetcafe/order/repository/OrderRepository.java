package com.cei.internetcafe.order.repository;

import com.cei.internetcafe.order.model.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {
    List<OrderModel> findAllBySeatIdAndStatusIn(long seatId, List<String> statuses);
    List<OrderModel> findAllBySeatIdIn(List<Long> seatIds);
    List<OrderModel> findAllBySeatIdInAndStatusIn(List<Long> seatIds, List<String> statuses);
    List<OrderModel> findAllBySeatIdInOrderByCreatedAtDesc(List<Long> seatIds);
}