package com.cei.internetcafe.order.service;

import com.cei.internetcafe.order.model.MenuModel;
import com.cei.internetcafe.order.model.OrderListModel;
import com.cei.internetcafe.order.model.OrderModel;
import com.cei.internetcafe.order.repository.MenuRepository;
import com.cei.internetcafe.order.repository.OrderListRepository;
import com.cei.internetcafe.order.repository.OrderRepository;
import com.cei.internetcafe.seat.repository.SeatOrderRepository;
import com.cei.internetcafe.user.model.WalletModel;
import com.cei.internetcafe.user.repository.UserRepository;
import com.cei.internetcafe.user.repository.WalletRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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

        boolean hasSeat = seatOrderRepository.existsBySeatIdAndUserId(seatId, userId);
        if (!hasSeat) {
            throw new RuntimeException("User has no active seat order");
        }

        OrderModel orderModel = new OrderModel();
        orderModel.setSeatId(seatId);
        orderModel.setStatus("pending");
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
}