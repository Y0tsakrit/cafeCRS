package com.cei.internetcafe.seat.repository;

import com.cei.internetcafe.seat.model.SeatModel;
import com.cei.internetcafe.seat.model.SeatOrderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeatRepository extends JpaRepository<SeatModel, Long> {

}