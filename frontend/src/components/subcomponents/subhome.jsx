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
      <div className="flex flex-col px-2 max-w-2xl h-full">
        <div className="flex items-center gap-2 mb-2 font-bold text-xl">
          <span className="cursor-pointer" onClick={() => setShowOrderDetail(null)}>&larr;</span>
          Order Detail
        </div>
        <div className="bg-[#F7F7F7] p-6 rounded-2xl">
          <div className="flex flex-row items-center gap-2 mb-1 font-semibold text-lg">
            <span>Order #{o.orderId}</span>
            <span className="text-[#8337D9]">{o.seatName}</span>
            <span className="font-normal text-gray-400 text-base">Reservation #{o.seatOrderId}</span>
          </div>
          <div className="mb-3 text-gray-500 text-sm">{new Date(o.createdAt).toLocaleString()}</div>
          <div className="mb-2 font-semibold text-[#8337D9]">Items</div>
          {o.items.map((item, i) => (
            <div key={i} className="flex flex-row items-center bg-white mb-2 px-4 py-2 rounded-xl">
              <span className="w-6 text-center">{item.quantity}</span>
              <span className="flex-1 ml-4">{item.menuName}</span>
              <span className="font-semibold">{item.price} THB</span>
            </div>
          ))}
          <div className="flex flex-row justify-between items-center mt-4">
            <span className="font-semibold text-[#8337D9] text-lg">Total</span>
            <span className="font-bold text-black text-2xl">{o.totalPrice} THB</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {/* Current Reservation Section */}
      <div>
        <div className='mb-2 font-bold text-2xl'>Current Reservation</div>
        {bookedSeats.length === 0 ? (
          <div className='bg-[#F7F7F7] p-6 rounded-2xl w-full text-gray-400'>No current reservations.</div>
        ) : (
          bookedSeats.map(order => {
            const start = new Date(order.dateStart);
            const end = new Date(order.dateEnd);
            const dateStr = start.toLocaleDateString('en-GB');
            const timeStr = `${start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}-${end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
            const hours = (end - start) / 3600000;
            return (
              <div key={order.id} className='bg-[#F7F7F7] mb-3 p-6 rounded-2xl w-full'>
                <div className='mb-1 font-semibold text-lg'>Order #{order.id}</div>
                <div className='mb-3 text-gray-500 text-sm'>{dateStr} {timeStr}</div>
                <div className='flex flex-row mb-1'>
                  <div className='w-24 font-semibold text-[#8337D9]'>Seat</div>
                  <div className='text-black'>{order.seatName}</div>
                </div>
                <div className='flex flex-row'>
                  <div className='w-24 font-semibold text-[#8337D9]'>Duration</div>
                  <div className='text-black'>{hours} hr{hours !== 1 ? 's' : ''}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div>
        <div className='mb-2 font-bold text-2xl'>Current Order</div>
        {(() => {
          const bookedSeatOrderIds = new Set(bookedSeats.map(s => s.id));
          const filteredOrders = currentOrders.filter(o => bookedSeatOrderIds.has(o.seatOrderId));
          return filteredOrders.length === 0 ? (
          <div className='bg-[#F7F7F7] p-6 rounded-2xl w-full text-gray-400'>No current orders.</div>
        ) : (
          filteredOrders.map(o => (
            <div key={o.orderId} className='flex sm:flex-row flex-col justify-between items-start sm:items-center gap-2 bg-[#F7F7F7] mb-3 p-4 md:p-6 rounded-2xl w-full cursor-pointer' onClick={() => setShowOrderDetail(o)}>
              <div>
                <div className='flex flex-row items-center gap-2 mb-1 font-semibold text-lg'>
                  <span>Order #{o.orderId}</span>
                  <span className='text-[#8337D9]'>{o.seatName}</span>
                  <span className='bg-[#FFF9E5] px-3 py-1 rounded-xl font-medium text-[#A68B00] text-xs capitalize'>{o.status}</span>
                </div>
                <div className='mb-2 text-gray-500 text-sm'>{new Date(o.createdAt).toLocaleString()}</div>
                <div className='text-gray-500 text-sm'>{o.items.length} item{o.items.length !== 1 ? 's' : ''}</div>
              </div>
              <div className='flex flex-row items-center gap-4'>
                <span className='font-bold text-black text-2xl'>{o.totalPrice} THB</span>
                <span className='text-gray-400 text-2xl'>{'→'}</span>
              </div>
            </div>
          ))
        )})()}
      </div>
    </div>
  )
}

export default Subhome