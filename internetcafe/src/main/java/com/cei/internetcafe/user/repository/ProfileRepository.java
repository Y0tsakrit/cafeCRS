package com.cei.internetcafe.user.repository;


import com.cei.internetcafe.user.model.ProfileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileModel, Long> {


}

