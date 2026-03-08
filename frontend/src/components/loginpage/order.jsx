import React, { useState, useEffect } from 'react'

function Order() {

  const [menus, setMenus] = useState([])
  const [bookedSeats, setBookedSeats] = useState([])
  const [selectedSeatId, setSelectedSeatId] = useState('')
  const [cart, setCart] = useState({})

  useEffect(() => {

    fetch('http://localhost:8000/api/menus/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(r => r.json())
      .then(data => setMenus(Object.values(data)))
      .catch(err => console.error('Error fetching menus:', err))

    fetch('http://localhost:8000/api/seats/book/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(r => r.json())
      .then(data => {
        const orders = data.orders || []
        setBookedSeats(orders)
        if (orders.length > 0) setSelectedSeatId(orders[0].seatId)
      })
      .catch(err => console.error('Error fetching seats:', err))

  }, [])


  const changeQty = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0
      const next = Math.max(0, current + delta)

      if (next === 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: next }
    })
  }

  const cartItems = menus.filter(m => cart[m.id] > 0)

  const total = cartItems.reduce(
    (sum, m) => sum + m.price * cart[m.id],
    0
  )

  const handleProcess = () => {

    if (!selectedSeatId) {
      alert('Please select a seat.')
      return
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty.')
      return
    }

    const orderList = {}

    cartItems.forEach(m => {
      orderList[m.id] = cart[m.id]
    })

    fetch('http://localhost:8000/api/orders/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        seatId: Number(selectedSeatId),
        orderList
      })
    })
    .then(r => r.text())
    .then(text => {
    alert(text)
    setCart({})
    window.location.href = "/mainpage";
    })
      .catch(() =>
        alert('An error occurred. Please try again.')
      )
  }

  return (

    <div className="bg-white p-6 md:p-10 h-full">

      {/* Page header */}
      <div className="mb-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-1">
          Our Menu
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Menu */}
        <div className="flex flex-col gap-4">
          {menus.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl"
            >
              <div>
                <div className="font-medium">
                  {item.name}
                </div>

                <div className="text-sm text-gray-500">
                  {item.price} THB
                </div>
              </div>
              <div className="flex items-center gap-3">

                <button
                  className="bg-gray-200 hover:bg-gray-300 w-7 h-7 rounded-lg font-bold"
                  onClick={() => changeQty(item.id, -1)}
                >
                  -
                </button>

                <span className="w-6 text-center">
                  {cart[item.id] || 0}
                </span>

                <button
                  className="bg-gray-200 hover:bg-gray-300 w-7 h-7 rounded-lg font-bold"
                  onClick={() => changeQty(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="sticky top-6 h-fit bg-gray-50 p-6 rounded-2xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold">
            Cart
          </h2>

          {/* Seat select */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">
              Select Seat
            </label>
            <select
              className="bg-white border border-gray-200 rounded-lg px-3 py-2"
              value={selectedSeatId}
              onChange={e => setSelectedSeatId(e.target.value)}
            >
              {bookedSeats.length === 0
                ? (
                  <option value="">
                    No active reservations
                  </option>
                )
                : bookedSeats.map(s => (
                  <option
                    key={s.id}
                    value={s.seatId}
                  >
                    {s.seatName}
                    {" "}
                    ({new Date(s.dateStart).toLocaleTimeString()}
                    {" - "}
                    {new Date(s.dateEnd).toLocaleTimeString()})
                  </option>
                ))
              }
            </select>
          </div>

          {/* Cart items */}
          <div className="font-semibold text-[#8337D9]">
            Items
          </div>
          {cartItems.length === 0
            ? (
              <div className="text-gray-400 text-sm">
                No items added yet.
              </div>
            )
            : cartItems.map(m => (
              <div
                key={m.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {cart[m.id]}× {m.name}
                </span>
                <span>
                  {(m.price * cart[m.id]).toFixed(0)} THB
                </span>
              </div>
            ))
          }

          {/* Total */}
          <div className="flex justify-between pt-3 border-t">
            <span className="font-bold text-[#8337D9] text-lg">
              Total
            </span>
            <span className="font-bold text-lg">
              {total.toFixed(0)} THB
            </span>
          </div>
          <button
            className="bg-[#05E81F] hover:bg-green-500 disabled:opacity-50 p-2 rounded-xl text-white font-semibold"
            disabled={cartItems.length === 0 || !selectedSeatId}
            onClick={handleProcess}
          >
            Process Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Order