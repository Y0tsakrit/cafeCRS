package com.cei.internetcafe.order.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "OrderList")
@Setter
@Getter
public class OrderListModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "\"menuId\"")
    private Long menuId;

    @Column(name = "\"orderId\"")
    private Long orderId;

    @Column(name = "\"quantity\"")
    private Integer quantity;

    @Column(name = "\"sumPrice\"")
    private Float price;

    @Column(name = "\"createdAt\"")
    private String createdAt;
}