import React, { useEffect, useState } from 'react'
import Dashbord from '../subcomponents/dashbord'
import Subnav from '../subcomponents/subnav'


function History() {
  const [reservationHistory, setReservationHistory] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    fetch('http://localhost:8000/api/seats/book/history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setReservationHistory(data.orders || []);
    })
    .catch(error => {
      console.error('Error fetching reservation history:', error);
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/orders/order/history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Current order:', data);
      setOrderHistory(data || []);
    })
    .catch(error => {
      console.error('Error fetching current orders:', error);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6 bg-white min-h-screen">
      <Dashbord className="items-center"/>
      <div className="flex md:flex-row flex-col gap-6 w-full max-w-[95%] mx-auto">
        <Subnav/>
        <div className='gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2 w-full'>
          <div className='mb-8'>
            <h2 className='mb-2 font-bold text-xl'>Reservation History</h2>
            {reservationHistory.length === 0 ? (
              <div className="bg-white border border-gray-200 p-6 rounded-2xl text-gray-400">
                No reservations found.
              </div>
            ) : (
              reservationHistory.slice(0, visibleCount).map((so) => (
                <div key={so.id} className='flex justify-between items-start bg-gray-50 hover:bg-gray-100 transition border border-gray-200 shadow-sm mb-3 p-5 rounded-xl'>
                  <div>
                    <div className='font-bold text-purple-700'>Date</div>
                    <div>{new Date(so.dateStart).toLocaleDateString()}</div>

                    <div className='font-bold text-purple-700'>Time</div>
                    <div>
                      {new Date(so.dateStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(so.dateEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>

                    <div className='font-bold text-purple-700'>Seat</div>
                    <div>{so.seatName}</div>
                  </div>
                  <div className='text-gray-400'>#{String(so.id).padStart(9, '0')}</div>
                </div>
              ))
            )}
            {reservationHistory.length > visibleCount && (
              <div className='text-gray-500 text-sm text-right underline italic cursor-pointer' onClick={() => setVisibleCount(v => v + 5)}>See More</div>
            )}
          </div>

          {/* Food Order History */}
          <div>
            <h2 className='mb-2 font-bold text-xl'>Food Order History</h2>
            {orderHistory.length === 0 ? (
              <div className="bg-white border border-gray-200 p-6 rounded-2xl text-gray-400">
                No food orders found.
              </div>
            ) : (
              orderHistory.map(o => (
                <div key={o.orderId} className='bg-gray-100 mb-2 p-4 rounded-lg'>
                  <div className='flex gap-4 mb-1'>
                    <span className='font-semibold'>Order #{o.orderId}</span>
                    <span className='font-bold text-purple-700'>{o.seatName}</span>
                    <span className='text-gray-400'>Reservation #{o.seatOrderId}</span>
                  </div>
                  <div className='mb-2 text-gray-500 text-sm'>{new Date(o.createdAt).toLocaleString()}</div>
                  <div className='mb-2'>
                    {o.items.map((item, i) => (
                      <div key={i} className='flex justify-between text-sm'>
                        <span>{item.quantity}× {item.menuName}</span>
                        <span>{item.price} THB</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <div className="font-bold text-purple-700">Total</div>
                    <div className="font-bold text-purple-700">{o.totalPrice} THB</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History