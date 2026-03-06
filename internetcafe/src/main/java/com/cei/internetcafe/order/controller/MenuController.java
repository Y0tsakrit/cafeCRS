package com.cei.internetcafe.order.controller;

import com.cei.internetcafe.order.model.MenuModel;
import com.cei.internetcafe.order.service.MenuService;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/menus")
public class MenuController {
    private JwtUtil jwtUtil;
    private MenuService menuService;
    private UserRepository userRepository;

    @GetMapping("/")
    public Object getAllMenus() {
        return menuService.getAllMenuItems();
    }

    @PostMapping("/add")
    public String addMenuItem(String name, Float price, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        long userId = Long.parseLong(jwtUtil.extractClaims(token).get("id").toString());
        boolean isAdmin = userRepository.existsByIdAndRole(userId, "ADMIN");

        if (!isAdmin) {
            throw new RuntimeException("Unauthorized");
        }

        MenuModel menuModel = new MenuModel();
        menuModel.setName(name);
        menuModel.setPrice(price);
        menuModel.setStoreId(1L);

        menuService.addMenuItem(menuModel);
        return "Menu item added successfully";
    }

    @PostMapping("/update")
    public String updateMenuItem(Long id, String name, Float price, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        long userId = Long.parseLong(jwtUtil.extractClaims(token).get("id").toString());
        boolean isAdmin = userRepository.existsByIdAndRole(userId, "ADMIN");

        if (!isAdmin) {
            throw new RuntimeException("Unauthorized");
        }

        MenuModel menuModel = new MenuModel();
        menuModel.setId(id);
        menuModel.setName(name);
        menuModel.setPrice(price);

        menuService.updateMenuItem(menuModel);
        return "Menu item updated successfully";
    }

    @PostMapping("/delete")
    public String deleteMenuItem(Long id, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        long userId = Long.parseLong(jwtUtil.extractClaims(token).get("id").toString());
        boolean isAdmin = userRepository.existsByIdAndRole(userId, "ADMIN");

        if (!isAdmin) {
            throw new RuntimeException("Unauthorized");
        }

        menuService.deleteMenuItem(id);
        return "Menu item deleted successfully";
    }
}