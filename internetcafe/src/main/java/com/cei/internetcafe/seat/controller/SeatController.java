package com.cei.internetcafe.seat.controller;

import com.cei.internetcafe.seat.dto.BookReq;
import com.cei.internetcafe.seat.dto.CancelRequest;
import com.cei.internetcafe.seat.dto.GetAvailableReq;
import com.cei.internetcafe.seat.model.SeatOrderModel;
import com.cei.internetcafe.seat.repository.SeatOrderRepository;
import com.cei.internetcafe.seat.service.OrderService;
import com.cei.internetcafe.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/seats")
@RestController
public class SeatController {

    @Autowired
    private OrderService OrderService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private SeatOrderRepository seatOrderRepository;


    @PostMapping("/available")
    public Map<Long, String> GetAvailableSeat(@RequestBody GetAvailableReq getAvailableReq) {
        return OrderService.getAvailableOrders(getAvailableReq.getStartTime(), getAvailableReq.getEndTime());
    }

    @PostMapping("/book")
    public String BookSeat(@RequestBody BookReq bookReq,
                           @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        try {
            String token = authorizationHeader.substring(7);
            Claims claims = jwtUtil.extractClaims(token);
            long userId = Long.parseLong(claims.get("id").toString());

            bookReq.getSeatId().forEach(seatId ->
                    OrderService.createOrder(userId, seatId, bookReq.getDateStart(), bookReq.getDateEnd())
            );

            return "Seat booked successfully.";

        } catch (IllegalStateException e) {
            return e.getMessage();
        }
    }

    @GetMapping("/book/current")
    public Map<String, List<Map<String, Object>>> GetAllBookedCurrent(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

            try {
                String token = authorizationHeader.substring(7);
                Claims claims = jwtUtil.extractClaims(token);

                long userId = Long.parseLong(claims.get("id").toString());

                List<SeatOrderModel> seatOrders = seatOrderRepository.findByUserIdAndDateEndGreaterThan(userId, LocalDateTime.now());

                List<Map<String, Object>> result = seatOrders.stream()
                        .map(order -> {
                            Map<String, Object> map = new HashMap<>();
                            map.put("id", order.getId());
                            map.put("seatId", order.getSeat().getId());
                            map.put("seatName", order.getSeat().getSeatName());
                            map.put("dateStart", order.getDateStart());
                            map.put("dateEnd", order.getDateEnd());
                            return map;
                        })
                        .toList();

                return Map.of("orders", result);

            } catch (Exception e) {
                throw new RuntimeException("Failed to fetch orders: " + e.getMessage(), e);
            }

    }

    @GetMapping("/book/history")
    public Map<String, List<Map<String, Object>>> GetAllBookedHistory(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {

        try {
            String token = authorizationHeader.substring(7);
            Claims claims = jwtUtil.extractClaims(token);

            long userId = Long.parseLong(claims.get("id").toString());

            List<SeatOrderModel> seatOrders = seatOrderRepository.findByUserId(userId);

            List<Map<String, Object>> result = seatOrders.stream()
                    .map(order -> {
                        Map<String, Object> map = new HashMap<>();
                        map.put("id", order.getId());
                        map.put("seatName", order.getSeat().getSeatName());
                        map.put("dateStart", order.getDateStart());
                        map.put("dateEnd", order.getDateEnd());
                        return map;
                    })
                    .toList();

            return Map.of("orders", result);

        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch orders: " + e.getMessage(), e);
        }

    }

    @PostMapping("/cancel")
    public String CancelSeat(@RequestBody CancelRequest orderId, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        try {
            String token = authorizationHeader.substring(7);
            Claims claims = jwtUtil.extractClaims(token);
            long userId = Long.parseLong(claims.get("id").toString());
            OrderService.cancelOrder(orderId.getOrderId(), userId);
            return "Seat booking cancelled successfully.";
        } catch (IllegalStateException e) {
            return e.getMessage();
        }
    }
}