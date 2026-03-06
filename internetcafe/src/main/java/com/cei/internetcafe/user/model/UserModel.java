package com.cei.internetcafe.user.model;

    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;

    import java.time.LocalDateTime;

    @Getter
    @Entity
    @Setter
    @Table(name = "\"User\"")
    public class UserModel {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @Column(name = "email")
        private String email;

        @Column(name = "password")
        private String password;

        @Column(name = "role")
        private String role;


        @Column(name = "created_at")
        private LocalDateTime createdAt;

        public UserModel() {}

        public UserModel(String email, String password,String role, LocalDateTime createdAt) {
            this.email = email;
            this.password = password;
            this.role = role;
            this.createdAt = createdAt;
        }

    }