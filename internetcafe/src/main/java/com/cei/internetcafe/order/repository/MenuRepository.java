package com.cei.internetcafe.order.repository;

import com.cei.internetcafe.order.model.MenuModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<MenuModel,Long> {
}