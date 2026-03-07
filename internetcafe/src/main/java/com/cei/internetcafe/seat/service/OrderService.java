package com.cei.internetcafe.seat.service;

import com.cei.internetcafe.seat.model.SeatModel;
import com.cei.internetcafe.seat.model.SeatOrderModel;
import com.cei.internetcafe.seat.repository.SeatOrderRepository;
import com.cei.internetcafe.seat.repository.SeatRepository;
import com.cei.internetcafe.user.model.WalletModel;
import com.cei.internetcafe.user.repository.WalletRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final SeatOrderRepository seatOrderRepository;
    private final SeatRepository seatRepository;
    private  final WalletRepository walletRepository;

    public OrderService(SeatOrderRepository seatOrderRepository, SeatRepository seatRepository, WalletRepository walletRepository) {
        this.seatOrderRepository = seatOrderRepository;
        this.seatRepository = seatRepository;
        this.walletRepository = walletRepository;
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
        if (dateEnd.isBefore(dateStart)) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        boolean isBooked = seatOrderRepository.existsBySeatIdAndDateStartLessThanAndDateEndGreaterThan(seatId, dateEnd, dateStart);
        if (isBooked) {
            throw new IllegalStateException("Seat is already booked for the specified time.");
        }

        long hours = Duration.between(dateStart, dateEnd).toMinutes();
        float price = hours * 1f;
        boolean hasSufficientFunds = walletRepository.existsByUserIdAndAmountGreaterThanEqual(userId, price);
        if (!hasSufficientFunds) {
            throw new IllegalStateException("Insufficient funds in wallet.");
        }

        WalletModel wallet = walletRepository.findById(userId).orElseThrow(() -> new IllegalStateException("Wallet not found for user."));
        wallet.setAmount(wallet.getAmount() - price);
        walletRepository.save(wallet);
        SeatOrderModel newOrder = new SeatOrderModel(userId, seatId, dateStart, dateEnd);
        seatOrderRepository.save(newOrder);
    }

    public void cancelOrder(long orderId, long userId) {
        SeatOrderModel order = seatOrderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalStateException("Order not found."));
        if (order.getUserId() != userId) {
            throw new IllegalStateException("User is not authorized to cancel this order.");
        }
        if (order.getDateStart().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Cannot cancel an order that has already started.");
        }
        float price = order.getDateEnd().compareTo(order.getDateStart()) * 1.5f;
        WalletModel wallet = walletRepository.findById(userId).orElseThrow(() -> new IllegalStateException("Wallet not found for user."));
        wallet.setAmount(wallet.getAmount() + price);
        walletRepository.save(wallet);
        seatOrderRepository.delete(order);
    }


}