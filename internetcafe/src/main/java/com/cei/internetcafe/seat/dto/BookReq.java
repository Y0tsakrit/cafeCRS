package com.cei.internetcafe.seat.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class BookReq {


    private long seatId;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;


    // Constructors
    public BookReq() {}

    public BookReq(long seatId, LocalDateTime dateStart, LocalDateTime dateEnd) {
        this.seatId = seatId;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

}