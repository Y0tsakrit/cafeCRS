package com.cei.internetcafe.seat.repository;

import com.cei.internetcafe.seat.model.SeatOrderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SeatOrderRepository extends JpaRepository<SeatOrderModel, Long> {

    List<SeatOrderModel> findByDateStartLessThanAndDateEndGreaterThan(
            LocalDateTime requestEnd,
            LocalDateTime requestStart
    );

    boolean existsBySeatIdAndDateStartLessThanAndDateEndGreaterThan(
            long seatId,
            LocalDateTime requestEnd,
            LocalDateTime requestStart
    );
}