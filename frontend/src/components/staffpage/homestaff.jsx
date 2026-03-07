import React, { useEffect, useState } from 'react'
import Subnavstaff from './subcomponent/subnavstaff';
import { MdOutlineAccountBalance, MdOutlineLaptop, MdOutlineRestaurantMenu, MdOutlineReceiptLong } from 'react-icons/md'

function StatCard({ icon, value, label }) {
  return (
    <div className='flex items-center gap-4 bg-[#F7F8FA] p-4 rounded-xl'>
      <div className='text-4xl'>{icon}</div>
      <div>
        <div className='font-bold text-gray-800 text-2xl'>{value}</div>
        <div className='text-gray-500 text-sm'>{label}</div>
      </div>
    </div>
  );
}

function Homestaff() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/admin/report', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(r => r.json())
      .then(data => setReport(data))
      .catch(err => console.error('Error fetching report:', err));
  }, []);

  const t = report?.today;
  const a = report?.allTime;

  return (
    <div className='flex md:flex-row flex-col bg-white min-h-screen'>
      <Subnavstaff />
      <div className='flex-1 p-4 md:p-8 overflow-y-auto'>
        {/* Today's Sale Report */}
        <div className='bg-white shadow-sm mb-6 p-4 md:p-6 border border-gray-100 rounded-2xl'>
          <div className='mb-4 font-bold text-xl'>Today's Sale Report</div>
          <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 mb-4'>
            <StatCard
              icon={<MdOutlineAccountBalance className='text-green-600' />}
              value={t ? t.revenue.toFixed(2) : '0.00'}
              label='Total Revenue'
            />
            <StatCard
              icon={<MdOutlineLaptop className='text-blue-500' />}
              value={t ? `${t.computersBooked}/${t.totalComputers}` : '0/0'}
              label='Total Computers Booked'
            />
            <StatCard
              icon={<MdOutlineRestaurantMenu className='text-yellow-500' />}
              value={t ? t.foodSold.toFixed(2) : '0.00'}
              label='Food & Drinks Sold'
            />
            <StatCard
              icon={<MdOutlineReceiptLong className='text-blue-700' />}
              value={t ? t.totalOrders : '0'}
              label='Total Orders'
            />
          </div>

          <div className='gap-4 grid grid-cols-1 sm:grid-cols-2'>
            {/* Top-selling */}
            <div className='bg-[#F7F8FA] p-4 rounded-xl'>
              <div className='mb-3 font-bold'>Top-selling food item</div>
              {t && t.topSellingItems.length > 0 ? (
                t.topSellingItems.map((item, i) => (
                  <div key={i} className='flex justify-between py-1 text-sm'>
                    <span>{item.name}</span>
                    <span className='text-gray-500'>x{item.quantity}</span>
                  </div>
                ))
              ) : (
                <div className='text-gray-400 text-sm'>No data</div>
              )}
            </div>

            {/* Peak hour & avg session */}
            <div className='flex flex-col gap-4 bg-[#F7F8FA] p-4 rounded-xl'>
              <div>
                <div className='mb-1 font-bold'>Peak hour</div>
                <div className='text-gray-500 text-sm'>{t ? t.peakHour : 'N/A'}</div>
              </div>
              <div>
                <div className='mb-1 font-bold'>Average session duration</div>
                <div className='text-gray-500 text-sm'>{t ? `${t.avgSessionHours} hours` : 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Sale Report */}
        <div className='bg-white shadow-sm p-4 md:p-6 border border-gray-100 rounded-2xl'>
          <div className='mb-4 font-bold text-xl'>Total Sale Report</div>
          <div className='gap-4 grid grid-cols-1 sm:grid-cols-2'>
            <StatCard
              icon={<MdOutlineAccountBalance className='text-green-600' />}
              value={a ? a.revenue.toFixed(2) : '0.00'}
              label='All Time Revenue'
            />
            <StatCard
              icon={<MdOutlineLaptop className='text-blue-500' />}
              value={a ? a.computersBooked : '0'}
              label='All Time Computers Booked'
            />
            <StatCard
              icon={<MdOutlineRestaurantMenu className='text-yellow-500' />}
              value={a ? a.foodSold.toFixed(2) : '0.00'}
              label='Total Food & Drinks Sold'
            />
            <StatCard
              icon={<MdOutlineReceiptLong className='text-blue-700' />}
              value={a ? a.totalOrders : '0'}
              label='All Time Orders'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homestaff