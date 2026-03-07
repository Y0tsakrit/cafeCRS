package com.cei.internetcafe.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderItemDto {
    private int quantity;
    private String menuName;
    private float price;
}

