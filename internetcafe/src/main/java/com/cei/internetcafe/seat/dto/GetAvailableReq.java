package com.cei.internetcafe.seat.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class GetAvailableReq {


    private LocalDateTime startTime;
    private LocalDateTime endTime;


    // Constructors
    public GetAvailableReq() {}

    public GetAvailableReq(LocalDateTime startTime,LocalDateTime endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

}