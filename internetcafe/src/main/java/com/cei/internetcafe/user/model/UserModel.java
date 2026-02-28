package com.cei.internetcafe.user.model;

    import jakarta.persistence.*;
    import lombok.Getter;
    import lombok.Setter;

    import java.time.LocalDateTime;

    @Getter
    @Entity
    @Table(name = "\"User\"")
    public class UserModel {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Long id;

        @Setter
        @Column(name = "email")
        private String email;

        @Setter
        @Column(name = "password")
        private String password;

        // Fixed: camelCase method name and parameter
        @Setter
        @Column(name = "created_at")
        private LocalDateTime createdAt;

        public UserModel() {}

        public UserModel(String email, String password, LocalDateTime createdAt) {
            this.email = email;
            this.password = password;
            this.createdAt = createdAt;
        }

    }