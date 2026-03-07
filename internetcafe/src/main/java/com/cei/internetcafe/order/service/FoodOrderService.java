package com.cei.internetcafe.order.service;

import com.cei.internetcafe.order.dto.OrderItemDto;
import com.cei.internetcafe.order.dto.OrderResponseDto;
import com.cei.internetcafe.order.model.MenuModel;
import com.cei.internetcafe.order.model.OrderListModel;
import com.cei.internetcafe.order.model.OrderModel;
import com.cei.internetcafe.order.repository.MenuRepository;
import com.cei.internetcafe.order.repository.OrderListRepository;
import com.cei.internetcafe.order.repository.OrderRepository;
import com.cei.internetcafe.seat.model.SeatOrderModel;
import com.cei.internetcafe.seat.repository.SeatOrderRepository;
import com.cei.internetcafe.user.model.WalletModel;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.user.repository.WalletRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FoodOrderService {

    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;
    private final SeatOrderRepository seatOrderRepository;
    private final MenuRepository menuRepository;
    private final WalletRepository walletRepository;

    public FoodOrderService(OrderRepository orderRepository, OrderListRepository orderListRepository, SeatOrderRepository seatOrderRepository, MenuRepository menuRepository, UserRepository userRepository, WalletRepository walletRepository) {
        this.orderRepository = orderRepository;
        this.orderListRepository = orderListRepository;
        this.seatOrderRepository = seatOrderRepository;
        this.menuRepository = menuRepository;
        this.walletRepository = walletRepository;
    }

    public List<OrderModel> getAllOrders() {
        return orderRepository.findAll();
    }

    public OrderModel getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Transactional
    public void createOrder(Map<String, Integer> orderList, Long seatId, Long userId) {

        // Find the active seatOrder for this user+seat (FK requires seatOrder.id, not seat.id)
        SeatOrderModel seatOrder = seatOrderRepository.findTopByUserIdAndSeatIdOrderByDateStartDesc(userId, seatId)
                .orElseThrow(() -> new RuntimeException("User has no active seat order for seat " + seatId));

        OrderModel orderModel = new OrderModel();
        orderModel.setSeatId(seatOrder.getId()); // store seatOrder.id, not seat.id
        orderModel.setStatus("pending");
        orderModel.setCreatedAt(LocalDateTime.now());
        orderRepository.save(orderModel);

        List<Long> menuIds = orderList.keySet()
                .stream()
                .map(Long::valueOf)
                .toList();

        List<MenuModel> menus = menuRepository.findAllById(menuIds);

        Map<Long, MenuModel> menuMap = menus.stream()
                .collect(Collectors.toMap(MenuModel::getId, m -> m));

        List<OrderListModel> items = new ArrayList<>();
        float totalPrice = 0f;

        for (Map.Entry<String, Integer> entry : orderList.entrySet()) {
            Long menuId = Long.valueOf(entry.getKey());
            int quantity = entry.getValue();

            MenuModel menu = menuMap.get(menuId);
            if (menu == null) {
                throw new RuntimeException("Menu item not found: " + menuId);
            }

            float price = quantity * menu.getPrice();
            totalPrice += price;

            OrderListModel item = new OrderListModel();
            item.setMenuId(menu.getId());
            item.setOrderId(orderModel.getId());
            item.setQuantity(quantity);
            item.setPrice(price);
            item.setCreatedAt(LocalDateTime.now());
            items.add(item);
        }

        WalletModel wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        if (wallet.getAmount() < totalPrice) {
            throw new RuntimeException("Insufficient balance");
        }

        wallet.setAmount(wallet.getAmount() - totalPrice);
        walletRepository.save(wallet);

        orderListRepository.saveAll(items);
    }

    public void updateOrderStatus(Long orderId, String status) {
        OrderModel order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
    }

    public List<OrderResponseDto> getAllOrdersForStaff() {
        List<OrderModel> orders = orderRepository.findAll();
        orders.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));
        if (orders.isEmpty()) return List.of();

        List<Long> seatOrderIds = orders.stream().map(OrderModel::getSeatId).distinct().toList();
        List<SeatOrderModel> seatOrders = seatOrderRepository.findAllById(seatOrderIds);
        Map<Long, SeatOrderModel> seatOrderById = seatOrders.stream()
                .collect(Collectors.toMap(SeatOrderModel::getId, s -> s, (a, b) -> a));

        List<Long> orderIds = orders.stream().map(OrderModel::getId).toList();
        List<OrderListModel> allItems = orderListRepository.findAllByOrderIdIn(orderIds);
        Map<Long, List<OrderListModel>> itemsByOrderId = allItems.stream()
                .collect(Collectors.groupingBy(OrderListModel::getOrderId));

        List<Long> menuIds = allItems.stream().map(OrderListModel::getMenuId).distinct().toList();
        Map<Long, MenuModel> menuMap = menuRepository.findAllById(menuIds).stream()
                .collect(Collectors.toMap(MenuModel::getId, m -> m));

        List<OrderResponseDto> result = new ArrayList<>();
        for (OrderModel order : orders) {
            SeatOrderModel seatOrder = seatOrderById.get(order.getSeatId());
            String seatName = (seatOrder != null && seatOrder.getSeat() != null)
                    ? seatOrder.getSeat().getSeatName() : "Seat #" + order.getSeatId();
            Long reservationId = seatOrder != null ? seatOrder.getId() : null;

            List<OrderListModel> orderItems = itemsByOrderId.getOrDefault(order.getId(), List.of());
            List<OrderItemDto> itemDtos = new ArrayList<>();
            float total = 0f;
            for (OrderListModel item : orderItems) {
                MenuModel menu = menuMap.get(item.getMenuId());
                String menuName = menu != null ? menu.getName() : "Unknown";
                itemDtos.add(new OrderItemDto(item.getQuantity(), menuName, item.getPrice()));
                total += item.getPrice();
            }
            result.add(new OrderResponseDto(order.getId(), reservationId, seatName,
                    order.getStatus(), order.getCreatedAt(), total, itemDtos));
        }
        return result;
    }

    public List<OrderResponseDto> getCurrentOrdersByUserId(long userId) {

        List<SeatOrderModel> seatOrders = seatOrderRepository.findByUserId(userId);

        if (seatOrders.isEmpty()) {
            return List.of();
        }

        Map<Long, SeatOrderModel> seatOrderById = seatOrders.stream()
                .collect(Collectors.toMap(SeatOrderModel::getId, s -> s, (a, b) -> a));

        List<Long> seatOrderIds = seatOrders.stream().map(SeatOrderModel::getId).toList();

        List<OrderModel> orders = orderRepository.findAllBySeatIdIn(seatOrderIds);

        if (orders.isEmpty()) {
            return List.of();
        }

        List<Long> orderIds = orders.stream().map(OrderModel::getId).toList();

        List<OrderListModel> allItems = orderListRepository.findAllByOrderIdIn(orderIds);

        Map<Long, List<OrderListModel>> itemsByOrderId = allItems.stream()
                .collect(Collectors.groupingBy(OrderListModel::getOrderId));

        List<Long> menuIds = allItems.stream().map(OrderListModel::getMenuId).distinct().toList();

        Map<Long, MenuModel> menuMap = menuRepository.findAllById(menuIds).stream()
                .collect(Collectors.toMap(MenuModel::getId, m -> m));

        List<OrderResponseDto> result = new ArrayList<>();
        for (OrderModel order : orders) {
            SeatOrderModel seatOrder = seatOrderById.get(order.getSeatId());

            String seatName = (seatOrder != null && seatOrder.getSeat() != null)
                    ? seatOrder.getSeat().getSeatName() : "Seat #" + order.getSeatId();

            Long reservationId = seatOrder != null ? seatOrder.getId() : null;

            List<OrderListModel> orderItems = itemsByOrderId.getOrDefault(order.getId(), List.of());

            List<OrderItemDto> itemDtos = new ArrayList<>();
            float total = 0f;
            for (OrderListModel item : orderItems) {
                MenuModel menu = menuMap.get(item.getMenuId());
                String menuName = menu != null ? menu.getName() : "Unknown";
                itemDtos.add(new OrderItemDto(item.getQuantity(), menuName, item.getPrice()));
                total += item.getPrice();
            }

            result.add(new OrderResponseDto(
                    order.getId(), reservationId, seatName,
                    order.getStatus(), order.getCreatedAt(), total, itemDtos
            ));
        }

        return result;
    }

    public List<OrderResponseDto> getOrderHistoryByUserId(long userId) {

        List<SeatOrderModel> seatOrders = seatOrderRepository.findByUserId(userId);
        if (seatOrders.isEmpty()) return List.of();

        Map<Long, SeatOrderModel> seatOrderById = seatOrders.stream()
                .collect(Collectors.toMap(SeatOrderModel::getId, s -> s, (a, b) -> a));

        List<Long> seatOrderIds = seatOrders.stream().map(SeatOrderModel::getId).toList();

        // Newest first
        List<OrderModel> orders = orderRepository.findAllBySeatIdInOrderByCreatedAtDesc(seatOrderIds);
        if (orders.isEmpty()) return List.of();

        List<Long> orderIds = orders.stream().map(OrderModel::getId).toList();

        List<OrderListModel> allItems = orderListRepository.findAllByOrderIdIn(orderIds);

        Map<Long, List<OrderListModel>> itemsByOrderId = allItems.stream()
                .collect(Collectors.groupingBy(OrderListModel::getOrderId));

        List<Long> menuIds = allItems.stream().map(OrderListModel::getMenuId).distinct().toList();

        Map<Long, MenuModel> menuMap = menuRepository.findAllById(menuIds).stream()
                .collect(Collectors.toMap(MenuModel::getId, m -> m));

        List<OrderResponseDto> result = new ArrayList<>();
        for (OrderModel order : orders) {
            SeatOrderModel seatOrder = seatOrderById.get(order.getSeatId());

            String seatName = (seatOrder != null && seatOrder.getSeat() != null)
                    ? seatOrder.getSeat().getSeatName() : "Seat #" + order.getSeatId();

            Long reservationId = seatOrder != null ? seatOrder.getId() : null;

            List<OrderListModel> orderItems = itemsByOrderId.getOrDefault(order.getId(), List.of());

            List<OrderItemDto> itemDtos = new ArrayList<>();
            float total = 0f;
            for (OrderListModel item : orderItems) {
                MenuModel menu = menuMap.get(item.getMenuId());
                String menuName = menu != null ? menu.getName() : "Unknown";
                itemDtos.add(new OrderItemDto(item.getQuantity(), menuName, item.getPrice()));
                total += item.getPrice();
            }

            result.add(new OrderResponseDto(
                    order.getId(), reservationId, seatName,
                    order.getStatus(), order.getCreatedAt(), total, itemDtos
            ));
        }

        return result;
    }
}