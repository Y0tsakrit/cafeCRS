package com.cei.internetcafe.order.controller;

import com.cei.internetcafe.order.dto.OrderResponseDto;
import com.cei.internetcafe.order.dto.PlaceOrderReq;
import com.cei.internetcafe.order.dto.UpdateOrderReq;
import com.cei.internetcafe.order.service.MenuService;
import com.cei.internetcafe.order.service.FoodOrderService;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final UserRepository userRepository;
    private final FoodOrderService foodOrderService;
    private final MenuService menuService;
    private final JwtUtil jwtUtil;

    public OrderController(UserRepository userRepository, FoodOrderService foodOrderService, MenuService menuService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.foodOrderService = foodOrderService;
        this.menuService = menuService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/order")
    public String placeOrder(@RequestBody PlaceOrderReq placeOrderReq, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Claims claims = jwtUtil.extractClaims(token);
        long userId = Long.parseLong(claims.get("id").toString());

        foodOrderService.createOrder(placeOrderReq.getOrderList(), placeOrderReq.getSeatId(), userId);
        return "Order placed successfully";
    }

    @PostMapping("/order/update")
    public String updateOrderStatus(@RequestBody UpdateOrderReq updateOrderReq, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Claims claims = jwtUtil.extractClaims(token);
        long userId = Long.parseLong(claims.get("id").toString());
        boolean isStaff = userRepository.existsByIdAndRoleIgnoreCase(userId, "ADMIN")
                       || userRepository.existsByIdAndRoleIgnoreCase(userId, "STAFF");
        if (!isStaff) {
            throw new RuntimeException("Unauthorized");
        }
        foodOrderService.updateOrderStatus(updateOrderReq.getOrderId(), updateOrderReq.getStatus());
        return "Order status updated successfully";
    }

    @GetMapping("/order/current")
    public List<OrderResponseDto> getCurrentOrders(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Claims claims = jwtUtil.extractClaims(token);
        long userId = Long.parseLong(claims.get("id").toString());
        return foodOrderService.getCurrentOrdersByUserId(userId);
    }

    @GetMapping("/order/all")
    public List<OrderResponseDto> getAllOrdersForStaff(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Claims claims = jwtUtil.extractClaims(token);
        long userId = Long.parseLong(claims.get("id").toString());
        boolean isStaff = userRepository.existsByIdAndRoleIgnoreCase(userId, "ADMIN")
                       || userRepository.existsByIdAndRoleIgnoreCase(userId, "STAFF");
        if (!isStaff) {
            throw new RuntimeException("Unauthorized");
        }
        return foodOrderService.getAllOrdersForStaff();
    }

    @GetMapping("/order/history")
    public List<OrderResponseDto> getOrderHistory(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        Claims claims = jwtUtil.extractClaims(token);
        long userId = Long.parseLong(claims.get("id").toString());
        return foodOrderService.getOrderHistoryByUserId(userId);
    }

}