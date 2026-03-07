package com.cei.internetcafe.seat.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Table(name = "\"seatOrder\"")
public class SeatOrderModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "\"userId\"")
    private long userId;

    @Column(name = "\"seatId\"")
    private long seatId;

    @Column(name = "\"dateStart\"")
    private LocalDateTime dateStart;

    @Column(name = "\"dateEnd\"")
    private LocalDateTime dateEnd;

    @ManyToOne
    @JoinColumn(name = "\"seatId\"", insertable = false, updatable = false)
    private SeatModel seat;



    @Column(name = "\"created_at\"", nullable = false)
    private LocalDateTime createdAt;

    public SeatOrderModel() {}

    public SeatOrderModel(long userId, long seatId, LocalDateTime dateStart, LocalDateTime dateEnd) {
        this.userId = userId;
        this.seatId = seatId;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.createdAt = LocalDateTime.now();
    }

}