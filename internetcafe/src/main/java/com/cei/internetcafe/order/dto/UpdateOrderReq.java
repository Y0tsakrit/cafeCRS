package com.cei.internetcafe.order.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UpdateOrderReq {
    private Long orderId;
    private String status;

}