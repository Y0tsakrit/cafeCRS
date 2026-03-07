package com.cei.internetcafe.order.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "\"Menu\"")
@Getter
@Setter
public class MenuModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "\"storeId\"")
    private Long storeId;

    @Column(name = "\"name\"")
    private String name;

    @Column(name = "\"price\"")
    private Float price;

    @Column(name = "\"createdAt\"")
    private LocalDateTime createdAt;

}