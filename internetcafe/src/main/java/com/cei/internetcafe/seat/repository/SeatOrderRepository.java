package com.cei.internetcafe.seat.repository;

import com.cei.internetcafe.seat.model.SeatOrderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeatOrderRepository extends JpaRepository<SeatOrderModel, Long> {
    Optional<SeatOrderModel> findTopByUserIdAndSeatIdOrderByDateStartDesc(long userId, long seatId);

    List<SeatOrderModel> findByDateStartLessThanAndDateEndGreaterThan(
            LocalDateTime requestEnd,
            LocalDateTime requestStart
    );

    boolean existsBySeatIdAndDateStartLessThanAndDateEndGreaterThan(
            long seatId,
            LocalDateTime requestEnd,
            LocalDateTime requestStart
    );

    boolean existsBySeatIdAndUserId(long seatId, long userId);

    List<SeatOrderModel> findByUserId(long userId);

    List<SeatOrderModel> findByUserIdAndDateEndGreaterThan(long userId, LocalDateTime dateEndIsGreaterThan);

    List<SeatOrderModel> findAllByUserIdAndDateEndGreaterThan(long userId, LocalDateTime dateEndIsGreaterThan);
}