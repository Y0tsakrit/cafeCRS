package com.cei.internetcafe.user.repository;

import com.cei.internetcafe.user.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    UserModel findByEmail(String email);

    Optional<UserModel> findByEmailAndPassword(String email, String password);

    List<UserModel> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    boolean existsByEmail(String email);

    boolean existsByIdAndRole(Long id, String role);


    @Modifying
    @Query("UPDATE UserModel u SET u.password = :password WHERE u.id = :id")
    int updatePasswordById(@Param("id") Long id, @Param("password") String password);

    @Modifying
    @Query("UPDATE UserModel u SET u.email = :email WHERE u.id = :id")
    int updateEmailById(@Param("id") Long id, @Param("email") String email);

    void deleteByEmail(String email);
}