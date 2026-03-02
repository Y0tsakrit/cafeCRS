package com.cei.internetcafe.seat.service;

import com.cei.internetcafe.seat.model.SeatModel;
import com.cei.internetcafe.seat.model.SeatOrderModel;
import com.cei.internetcafe.seat.repository.SeatOrderRepository;
import com.cei.internetcafe.seat.repository.SeatRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final SeatOrderRepository seatOrderRepository;
    private final SeatRepository seatRepository;

    public OrderService(SeatOrderRepository seatOrderRepository1, SeatRepository seatRepository1) {
        this.seatOrderRepository = seatOrderRepository1;
        this.seatRepository = seatRepository1;
    }

    public Map<Long,String> getAvailableOrders(LocalDateTime startTime, LocalDateTime endTime) {
        List<SeatModel> allSeats = seatRepository.findAll();
        List<SeatOrderModel> existingOrders = seatOrderRepository.findByDateStartLessThanAndDateEndGreaterThan(endTime, startTime);

        // Filter out seats that are already booked during the specified time

        return allSeats.stream()
                .filter(seat -> existingOrders.stream()
                        .noneMatch(order -> order.getSeatId() == seat.getId()))
                .collect(Collectors.toMap(
                        SeatModel::getId,
                        SeatModel::getSeatName
                ));
    }

    public void createOrder(long userId, long seatId, LocalDateTime dateStart, LocalDateTime dateEnd) {
        boolean isBooked = seatOrderRepository.existsBySeatIdAndDateStartLessThanAndDateEndGreaterThan(seatId, dateEnd, dateStart);
        if (isBooked) {
            throw new IllegalStateException("Seat is already booked for the specified time.");
        }
        SeatOrderModel newOrder = new SeatOrderModel(userId, seatId, dateStart, dateEnd);
        seatOrderRepository.save(newOrder);
    }


}