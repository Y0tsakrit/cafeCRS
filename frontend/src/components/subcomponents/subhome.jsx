import React, { use, useEffect, useState } from 'react'

function Subhome() {
  const [showOrderDetail, setShowOrderDetail] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/seats/book/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setBookedSeats(data.orders || []);
    })
    .catch(error => {
      console.error('Error fetching booked seats:', error);
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/orders/order/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Current order:', data);
      setCurrentOrders(data || []);
    })
    .catch(error => {
      console.error('Error fetching current orders:', error);
    });
  }, []);

  if (showOrderDetail) {
    const o = showOrderDetail;
    return (
      <div className="flex flex-col w-full max-w-3xl mx-auto px-3 sm:px-6 py-4 h-full">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 text-xl font-bold">
          <button
            className="text-gray-500 hover:text-black text-2xl"
            onClick={() => setShowOrderDetail(null)}
          >
            ←
          </button>
          Order Detail
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

          {/* Order Header */}
          <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
            <span>Order #{o.orderId}</span>
            <span className="text-[#8337D9]">{o.seatName}</span>
            <span className="text-sm text-gray-400 font-normal">
              Reservation #{o.seatOrderId}
            </span>
          </div>

          <div className="text-gray-500 text-sm mb-4">
            {new Date(o.createdAt).toLocaleString()}
          </div>

          {/* Items */}
          <div className="font-semibold text-[#8337D9] mb-2">Items</div>

          <div className="space-y-2">
            {o.items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white px-4 py-3 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="w-6 text-center font-medium">
                    {item.quantity}x
                  </span>

                  <span className="text-gray-700">
                    {item.menuName}
                  </span>
                </div>

                <span className="font-semibold">
                  {item.price} THB
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <span className="font-semibold text-[#8337D9] text-lg">Total</span>
            <span className="text-2xl font-bold">{o.totalPrice} THB</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>

        {/* Current Reservation */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Current Reservation
          </h2>

          {bookedSeats.length === 0 ? (
            <div className="bg-white border border-gray-200 p-6 rounded-2xl text-gray-400">
              No current reservations.
            </div>
          ) : (
            <div className="space-y-3">
              {bookedSeats.map(order => {
                const start = new Date(order.dateStart);
                const end = new Date(order.dateEnd);

                const dateStr = start.toLocaleDateString('en-GB');
                const timeStr = `${start.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})} - 
                ${end.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}`;

                const hours = (end - start) / 3600000;

                return (
                  <div
                    key={order.id}
                    className="bg-[#F7F7F7] rounded-2xl p-5 shadow-sm"
                  >
                    <div className="font-semibold text-lg mb-1">
                      Order #{order.id}
                    </div>

                    <div className="text-sm text-gray-500 mb-3">
                      {dateStr} {timeStr}
                    </div>

                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                      <span className="font-semibold text-[#8337D9]">Seat</span>
                      <span>{order.seatName}</span>

                      <span className="font-semibold text-[#8337D9]">Duration</span>
                      <span>
                        {hours} hr{hours !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>


        {/* Current Order */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Current Order
          </h2>

          {(() => {
            const bookedSeatOrderIds = new Set(bookedSeats.map(s => s.id));

            const filteredOrders = currentOrders.filter(o =>
              bookedSeatOrderIds.has(o.seatOrderId)
            );

            return filteredOrders.length === 0 ? (
              <div className="bg-white border border-gray-200 p-6 rounded-2xl text-gray-400">
                No current orders.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(o => (
                  <div
                    key={o.orderId}
                    onClick={() => setShowOrderDetail(o)}
                    className="bg-[#F7F7F7] hover:bg-gray-100 transition rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                  >

                    <div>
                      <div className="flex flex-wrap items-center gap-2 font-semibold text-lg">
                        <span>Order #{o.orderId}</span>

                        <span className="text-[#8337D9]">
                          {o.seatName}
                        </span>

                        <span className="bg-[#FFF9E5] px-2 py-1 rounded-lg text-xs font-medium text-[#A68B00] capitalize">
                          {o.status}
                        </span>
                      </div>

                      <div className="text-gray-500 text-sm">
                        {new Date(o.createdAt).toLocaleString()}
                      </div>

                      <div className="text-gray-500 text-sm">
                        {o.items.length} item{o.items.length !== 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-xl sm:text-2xl">
                        {o.totalPrice} THB
                      </span>

                      <span className="text-gray-400 text-xl">
                        →
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
  )
}

export default Subhome