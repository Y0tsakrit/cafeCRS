package com.cei.internetcafe.seat.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "\"seat\"")
public class SeatModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "\"storeId\"")
    private long storeId;

    @Column(name = "\"seatName\"")
    private String seatName;

    @Column(name = "\"created_at\"", nullable = false)
    private LocalDateTime createdAt;

    public SeatModel() {}

    public SeatModel(long storeId, String seatName) {
        this.storeId = storeId;
        this.seatName = seatName;
        this.createdAt = LocalDateTime.now();
    }

}