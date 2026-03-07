package com.cei.internetcafe.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrderResponseDto {
    private Long orderId;
    private Long seatOrderId;   // Reservation #
    private String seatName;
    private String status;
    private LocalDateTime createdAt;
    private float totalPrice;
    private List<OrderItemDto> items;
}

