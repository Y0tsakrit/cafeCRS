package com.cei.internetcafe.order.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class PlaceOrderReq {
    private Long seatId;
    private Map<String, Integer> orderList;
}