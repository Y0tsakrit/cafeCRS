package com.cei.internetcafe.order.service;

import com.cei.internetcafe.order.model.MenuModel;
import com.cei.internetcafe.order.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MenuService {

    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<MenuModel> getAllMenuItems() {
        return menuRepository.findAll();
    }

    public MenuModel getMenuItemById(Long id) {
        return menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Menu item not found"));
    }

    public void addMenuItem(MenuModel menuItem) {
        menuItem.setCreatedAt(LocalDateTime.now());
        menuRepository.save(menuItem);
    }

    public void updateMenuItem(MenuModel updatedMenuItem) {
        MenuModel existingMenuItem = menuRepository.findById(updatedMenuItem.getId()).orElseThrow(() -> new RuntimeException("Menu item not found"));
        existingMenuItem.setName(updatedMenuItem.getName());
        existingMenuItem.setPrice(updatedMenuItem.getPrice());
        menuRepository.save(existingMenuItem);
    }

    public void deleteMenuItem(Long id) {
        if (!menuRepository.existsById(id)) {
            throw new RuntimeException("Menu item not found");
        }
        menuRepository.deleteById(id);
    }


}