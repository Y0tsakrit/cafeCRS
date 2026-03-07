package com.cei.internetcafe.order.controller;

import com.cei.internetcafe.order.model.MenuModel;
import com.cei.internetcafe.order.service.FoodOrderService;
import com.cei.internetcafe.order.service.MenuService;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.util.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/menus")
public class MenuController {

    private final JwtUtil jwtUtil;
    private final MenuService menuService;
    private final FoodOrderService foodOrderService;
    private final UserRepository userRepository;

    public MenuController(JwtUtil jwtUtil, MenuService menuService, FoodOrderService foodOrderService, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.menuService = menuService;
        this.foodOrderService = foodOrderService;
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public Map<String, MenuModel> getAllMenus() {
        List<MenuModel> menuModels = menuService.getAllMenuItems();
        return menuModels.stream().collect(Collectors.toMap(MenuModel::getName, menu -> menu));
    }

    @PostMapping("/add")
    public String addMenuItem(
            @RequestBody MenuModel menuModel,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        long userId = Long.parseLong(jwtUtil.extractClaims(token).get("id").toString());
        boolean isAdmin = userRepository.existsByIdAndRole(userId, "ADMIN");
        if (!isAdmin) throw new RuntimeException("Unauthorized");
        menuModel.setStoreId(1L);
        menuService.addMenuItem(menuModel);
        return "Menu item added successfully";
    }

    @PostMapping("/update")
    public String updateMenuItem(
            @RequestBody MenuModel menuModel,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        long userId = Long.parseLong(jwtUtil.extractClaims(token).get("id").toString());
        boolean isAdmin = userRepository.existsByIdAndRole(userId, "ADMIN");
        if (!isAdmin) throw new RuntimeException("Unauthorized");
        menuService.updateMenuItem(menuModel);
        return "Menu item updated successfully";
    }

    @PostMapping("/delete")
    public String deleteMenuItem(
            @RequestBody Map<String, Long> body,
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        String token = authorizationHeader.substring(7);
        long userId = Long.parseLong(jwtUtil.extractClaims(token).get("id").toString());
        boolean isAdmin = userRepository.existsByIdAndRole(userId, "ADMIN");
        if (!isAdmin) throw new RuntimeException("Unauthorized");
        menuService.deleteMenuItem(body.get("id"));
        return "Menu item deleted successfully";
    }
}