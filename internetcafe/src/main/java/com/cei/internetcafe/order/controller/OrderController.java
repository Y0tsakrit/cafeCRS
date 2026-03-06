package com.cei.internetcafe.order.controller;

import com.cei.internetcafe.order.dto.PlaceOrderReq;
import com.cei.internetcafe.order.dto.UpdateOrderReq;
import com.cei.internetcafe.order.service.MenuService;
import com.cei.internetcafe.order.service.FoodOrderService;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final UserRepository userRepository;
    private FoodOrderService foodOrderService;

    private MenuService menuService;

    private JwtUtil jwtUtil;

    public OrderController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/order")
    public String placeOrder(PlaceOrderReq placeOrderReq, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Claims claims = jwtUtil.extractClaims(token);
        long userId = Long.parseLong(claims.get("id").toString());

        foodOrderService.createOrder(placeOrderReq.getOrderList(), placeOrderReq.getSeatId(), userId);
        return "Order placed successfully";

    }

    @PostMapping("/order/update")
    public String updateOrderStatus(UpdateOrderReq updateOrderReq, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Claims claims = jwtUtil.extractClaims(token);
        long userId = Long.parseLong(claims.get("id").toString());
        boolean isAdmin = userRepository.existsByIdAndRole(userId, "ADMIN");

        if (!isAdmin) {
            throw new RuntimeException("Unauthorized");
        }

        foodOrderService.updateOrderStatus(updateOrderReq.getOrderId(), updateOrderReq.getStatus());
        return "Order status updated successfully";

    }

}