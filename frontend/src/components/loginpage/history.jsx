import React from 'react'
import Dashbord from '../subcomponents/dashbord'
import Subnav from '../subcomponents/subnav'

import { users, profiles, wallets, seats, menus, seatOrders, orders, orderLists } from '../contraint/data'


function History() {
  // Mock userId for demonstration
  const userId = 1;
  const userProfile = profiles.find(p => p.userId === userId);
  const userWallet = wallets.find(w => w.userId === userId);
  const userSeatOrders = seatOrders.filter(so => so.userId === userId);
  const userOrders = orders.filter(o => userSeatOrders.some(so => so.seatId === o.seatId));
  const userOrderLists = orderLists.filter(ol => userOrders.some(o => o.id === ol.orderId));

  return (
    <div className='flex flex-col gap-4 bg-white h-screen'>
      <Dashbord className="items-center"/>
      <div className='flex flex-row gap-8 ml-19'>
        <Subnav/>
        <div className='flex flex-col'>
          <div className='mb-8'>
            <h2 className='mb-2 font-bold text-xl'>Reservation History</h2>
            {userSeatOrders.length === 0 ? (
              <div className='bg-gray-100 mb-2 p-4 rounded-lg'>No reservations found.</div>
            ) : (
              userSeatOrders.map((so, idx) => (
                <div key={so.id} className='flex justify-between bg-gray-100 mb-2 p-4 rounded-lg'>
                  <div>
                    <div className='font-bold text-purple-700'>Date</div>
                    <div>{new Date(so.dateStart).toLocaleDateString()}</div>
                    <div className='font-bold text-purple-700'>Time</div>
                    <div>{new Date(so.dateStart).toLocaleTimeString()} - {new Date(so.dateEnd).toLocaleTimeString()}</div>
                    <div className='font-bold text-purple-700'>Seat ID</div>
                    <div>{seats.find(s => s.id === so.seatId)?.seatName || 'N/A'}</div>
                  </div>
                  <div className='text-gray-400'>#{String(so.id).padStart(9, '0')}</div>
                </div>
              ))
            )}
            <div className='text-gray-500 text-sm text-right underline italic'>See More</div>
          </div>

          {/* Food Order History */}
          <div>
            <h2 className='mb-2 font-bold text-xl'>Food Order History</h2>
            {userOrders.length === 0 ? (
              <div className='bg-gray-100 mb-2 p-4 rounded-lg'>No food orders found.</div>
            ) : (
              userOrders.map(order => {
                const seatOrder = userSeatOrders.find(so => so.seatId === order.seatId);
                const orderItems = userOrderLists.filter(ol => ol.orderId === order.id);
                const total = orderItems.reduce((sum, item) => sum + item.sumPrice, 0);
                return (
                  <div key={order.id} className='bg-gray-100 mb-2 p-4 rounded-lg'>
                    <div className='flex justify-between items-center gap-8 mb-2'>
                      <span>Order #{String(order.id).padStart(9, '0')}</span>
                      <span className='font-bold text-purple-700'>Seat {seats.find(s => s.id === order.seatId)?.seatName || 'N/A'}</span>
                      <span className='text-gray-400'>Reservation #{seatOrder ? String(seatOrder.id).padStart(9, '0') : 'N/A'}</span>
                    </div>
                    <div className='mb-2 text-gray-500 text-sm'>
                      {seatOrder ? `${new Date(seatOrder.dateStart).toLocaleDateString()} ${new Date(seatOrder.dateStart).toLocaleTimeString()}` : ''}
                    </div>
                    <div className='mb-2'>
                      <div className='font-bold'>Item</div>
                      {orderItems.map(item => (
                        <div key={item.id} className='flex justify-between'>
                          <span>{item.quantity} {menus.find(m => m.id === item.menuId)?.name || 'Unknown'}</span>
                          <span>{item.sumPrice} THB</span>
                        </div>
                      ))}
                    </div>
                    <div className='font-bold text-purple-700 text-right'>Total {total} THB</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History