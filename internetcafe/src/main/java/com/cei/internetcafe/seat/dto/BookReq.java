package com.cei.internetcafe.seat.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class BookReq {


    private List<Long> seatId;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;


    // Constructors
    public BookReq() {}

    public BookReq(List<Long> seatId, LocalDateTime dateStart, LocalDateTime dateEnd) {
        this.seatId = seatId;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

}