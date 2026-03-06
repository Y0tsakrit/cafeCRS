package com.cei.internetcafe.order.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "\"Order\"")
public class OrderModel {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "\"seatId\"")
    private Long seatId;

    @Column(name = "\"menuId\"")
    private Long menuId;

    @Column(name = "\"status\"")
    private String status;

    @Column(name = "\"createdAt\"")
    private String createdAt;

}