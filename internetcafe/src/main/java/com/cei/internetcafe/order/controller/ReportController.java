package com.cei.internetcafe.order.controller;

import com.cei.internetcafe.order.model.MenuModel;
import com.cei.internetcafe.order.model.OrderListModel;
import com.cei.internetcafe.order.model.OrderModel;
import com.cei.internetcafe.order.repository.MenuRepository;
import com.cei.internetcafe.order.repository.OrderListRepository;
import com.cei.internetcafe.order.repository.OrderRepository;
import com.cei.internetcafe.seat.model.SeatOrderModel;
import com.cei.internetcafe.seat.repository.SeatOrderRepository;
import com.cei.internetcafe.seat.repository.SeatRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class ReportController {

    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;
    private final SeatOrderRepository seatOrderRepository;
    private final SeatRepository seatRepository;
    private final MenuRepository menuRepository;

    public ReportController(OrderRepository orderRepository,
                            OrderListRepository orderListRepository,
                            SeatOrderRepository seatOrderRepository,
                            SeatRepository seatRepository,
                            MenuRepository menuRepository) {
        this.orderRepository = orderRepository;
        this.orderListRepository = orderListRepository;
        this.seatOrderRepository = seatOrderRepository;
        this.seatRepository = seatRepository;
        this.menuRepository = menuRepository;
    }

    @GetMapping("/report")
    public ResponseEntity<Map<String, Object>> getReport() {
        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = todayStart.plusDays(1);


        List<OrderModel> allOrders = orderRepository.findAll();
        List<OrderModel> todayOrders = allOrders.stream()
                .filter(o -> o.getCreatedAt() != null
                        && !o.getCreatedAt().isBefore(todayStart)
                        && o.getCreatedAt().isBefore(todayEnd))
                .toList();


        List<OrderListModel> allItems = orderListRepository.findAll();
        Set<Long> todayOrderIds = todayOrders.stream().map(OrderModel::getId).collect(Collectors.toSet());
        List<OrderListModel> todayItems = allItems.stream()
                .filter(i -> todayOrderIds.contains(i.getOrderId()))
                .toList();

        double todayRevenue = todayItems.stream().mapToDouble(i -> i.getPrice() != null ? i.getPrice() : 0).sum();
        double allRevenue = allItems.stream().mapToDouble(i -> i.getPrice() != null ? i.getPrice() : 0).sum();


        int todayFoodSold = todayItems.stream().mapToInt(i -> i.getQuantity() != null ? i.getQuantity() : 0).sum();
        int allFoodSold = allItems.stream().mapToInt(i -> i.getQuantity() != null ? i.getQuantity() : 0).sum();

        List<SeatOrderModel> allSeatOrders = seatOrderRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        long todayComputersBooked = allSeatOrders.stream()
                .filter(so -> so.getDateStart() != null && so.getDateEnd() != null
                        && so.getDateStart().isBefore(now)
                        && so.getDateEnd().isAfter(now))
                .count();
        long totalComputers = seatRepository.count();
        long allComputersBooked = allSeatOrders.size();

        Map<Long, Integer> menuQtyMap = new HashMap<>();
        for (OrderListModel item : allItems) {
            if (item.getMenuId() != null && item.getQuantity() != null) {
                menuQtyMap.merge(item.getMenuId(), item.getQuantity(), Integer::sum);
            }
        }
        Map<Long, MenuModel> menuMap = menuRepository.findAll().stream()
                .collect(Collectors.toMap(MenuModel::getId, m -> m));
        List<Map<String, Object>> topSelling = menuQtyMap.entrySet().stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .limit(5)
                .map(e -> {
                    Map<String, Object> m = new HashMap<>();
                    MenuModel menu = menuMap.get(e.getKey());
                    m.put("name", menu != null ? menu.getName() : "Unknown");
                    m.put("quantity", e.getValue());
                    return m;
                })
                .toList();

        Map<Integer, Long> hourCounts = allOrders.stream()
                .filter(o -> o.getCreatedAt() != null)
                .collect(Collectors.groupingBy(o -> o.getCreatedAt().getHour(), Collectors.counting()));
        int peakHour = hourCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(-1);
        String peakHourStr = peakHour >= 0
                ? String.format("%d:00 - %d:00", peakHour, peakHour + 1)
                : "N/A";

        double avgSessionHours = allSeatOrders.stream()
                .filter(so -> so.getDateStart() != null && so.getDateEnd() != null)
                .mapToDouble(so -> ChronoUnit.MINUTES.between(so.getDateStart(), so.getDateEnd()) / 60.0)
                .average()
                .orElse(0);

        Map<String, Object> today = new HashMap<>();
        today.put("revenue", Math.round(todayRevenue * 100.0) / 100.0);
        today.put("computersBooked", todayComputersBooked);
        today.put("totalComputers", totalComputers);
        today.put("foodSold", todayFoodSold);
        today.put("totalOrders", todayOrders.size());
        today.put("topSellingItems", topSelling);
        today.put("peakHour", peakHourStr);
        today.put("avgSessionHours", Math.round(avgSessionHours * 100.0) / 100.0);

        Map<String, Object> allTime = new HashMap<>();
        allTime.put("revenue", Math.round(allRevenue * 100.0) / 100.0);
        allTime.put("computersBooked", allComputersBooked);
        allTime.put("foodSold", allFoodSold);
        allTime.put("totalOrders", allOrders.size());

        Map<String, Object> response = new HashMap<>();
        response.put("today", today);
        response.put("allTime", allTime);

        return ResponseEntity.ok(response);
    }
}
