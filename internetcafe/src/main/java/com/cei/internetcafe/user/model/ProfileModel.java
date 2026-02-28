package com.cei.internetcafe.user.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "Profile")
public class ProfileModel {

    @Id
    @Column(name = "\"userId\"")
    private Long id;

    @Column(name = "\"fName\"")
    private String fName;

    @Column(name = "\"lName\"")
    private String lName;

    @Column(name = "\"createdAt\"")
    private LocalDateTime createdAt;

    public ProfileModel() {}

    public ProfileModel(String fname, String lname, LocalDateTime createdAt) {
        this.fName = fname;
        this.lName = lname;
        this.createdAt = createdAt;
    }

}