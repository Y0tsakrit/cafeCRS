export const users = [
  {
    id: 1,
    email: "john@example.com",
    role: "USER",
    created_at: "2026-03-01T10:00:00Z"
  },
  {
    id: 2,
    email: "admin@example.com",
    role: "ADMIN",
    created_at: "2026-03-01T10:05:00Z"
  }
]

export const profiles = [
  {
    userId: 1,
    fName: "John",
    lName: "Doe",
    createdAt: "2026-03-01T10:01:00Z"
  },
  {
    userId: 2,
    fName: "Admin",
    lName: "User",
    createdAt: "2026-03-01T10:06:00Z"
  }
]

export const wallets = [
  {
    userId: 1,
    amount: 150
  },
  {
    userId: 2,
    amount: 1000
  }
]

export const seats = [
  {
    id: 1,
    storeId: 1,
    seatName: "A1"
  },
  {
    id: 2,
    storeId: 1,
    seatName: "A2"
  }
]

export const menus = [
  {
    id: 1,
    storeId: 1,
    name: "Coke",
    price: 20
  },
  {
    id: 2,
    storeId: 1,
    name: "Fried Rice",
    price: 60
  }
]

export const seatOrders = [
  {
    id: 1,
    userId: 1,
    seatId: 1,
    dateStart: "2026-03-02T09:00:00Z",
    dateEnd: "2026-03-02T11:00:00Z"
  }
]

export const orders = [
  {
    id: 1,
    seatId: 1,
    status: "PENDING"
  }
]

export const orderLists = [
  {
    id: 1,
    orderId: 1,
    menuId: 1,
    quantity: 2,
    sumPrice: 40
  },
  {
    id: 2,
    orderId: 1,
    menuId: 2,
    quantity: 1,
    sumPrice: 60
  }
]