package com.cei.internetcafe.seat.controller;

import com.cei.internetcafe.seat.dto.BookReq;
import com.cei.internetcafe.seat.dto.GetAvailableReq;
import com.cei.internetcafe.seat.service.OrderService;
import com.cei.internetcafe.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/api/seats")
@RestController
public class SeatController {

    @Autowired
     private OrderService OrderService;
    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/available")
    public Map<Long, String> GetAvailableSeat(@RequestBody GetAvailableReq getAvailableReq) {
        return OrderService.getAvailableOrders(getAvailableReq.getStartTime(), getAvailableReq.getEndTime());
    }

    @PostMapping("/book")
    public String BookSeat(@RequestBody BookReq bookReq, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        try {
            String token = authorizationHeader.substring(7);
            Claims claims=jwtUtil.extractClaims(token);
            System.out.println(claims);
            long userId=Long.parseLong(claims.get("id").toString());
            OrderService.createOrder(userId, bookReq.getSeatId(), bookReq.getDateStart(), bookReq.getDateEnd());
            return "Seat booked successfully.";
        } catch (IllegalStateException e) {
            return e.getMessage();
        }
    }
}