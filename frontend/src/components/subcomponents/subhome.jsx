import React, { useState } from 'react'

function Subhome() {
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  if (showOrderDetail) {
    return (
      <div className="flex flex-col px-2 max-w-2xl">
        <div className="flex items-center gap-2 mb-2 font-bold text-xl">
          <span className="cursor-pointer" onClick={() => setShowOrderDetail(false)}>&larr;</span>
          Order Detail
        </div>
        <div className="bg-[#F7F7F7] p-6 rounded-2xl">
          <div className="flex flex-row items-center gap-2 mb-1 font-semibold text-lg">
            <span>Order #0000000000</span>
            <span className="text-[#8337D9]">Seat A2</span>
            <span className="font-normal text-gray-400 text-base">Reservation #0000000000</span>
          </div>
          <div className="mb-3 text-gray-500 text-sm">01/01/2026 18.30</div>
          <div className="mb-2 font-semibold text-[#8337D9]">Item</div>
          <div className="flex flex-row items-center bg-white mb-4 px-4 py-2 rounded-xl">
            <span className="w-6 text-center">1</span>
            <span className="flex-1 ml-4">Fried Chicken</span>
            <span className="font-semibold">50 THB</span>
          </div>
          <div className="flex flex-row justify-between items-center mt-4">
            <span className="font-semibold text-[#8337D9] text-lg">Total</span>
            <span className="font-bold text-black text-2xl">50 THB</span>
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
        <div className='bg-[#F7F7F7] p-6 rounded-2xl w-full'>
          <div className='mb-1 font-semibold text-lg'>Order #0000000000</div>
          <div className='mb-3 text-gray-500 text-sm'>01/01/2026 18.00-19.00</div>
          <div className='flex flex-row mb-1'>
            <div className='w-24 font-semibold text-[#8337D9]'>Seat ID</div>
            <div className='text-black'>A1, A2</div>
          </div>
          <div className='flex flex-row'>
            <div className='w-24 font-semibold text-[#8337D9]'>Total</div>
            <div className='text-black'>400 THB</div>
          </div>
        </div>
      </div>

      <div>
        <div className='mb-2 font-bold text-2xl'>Current Order</div>
        <div className='flex flex-row justify-between items-center bg-[#F7F7F7] p-6 rounded-2xl w-full cursor-pointer' onClick={() => setShowOrderDetail(true)}>
          <div>
            <div className='flex flex-row items-center gap-2 mb-1 font-semibold text-lg'>
              <span>Order #0000000000</span>
              <span className='text-[#8337D9]'>Seat A2</span>
              <span className='bg-[#FFF9E5] px-3 py-1 rounded-xl font-medium text-[#A68B00] text-xs'>Pending</span>
            </div>
            <div className='mb-2 text-gray-500 text-sm'>01/01/2026 18.30</div>
            <div className='flex flex-row'>
              <div className='w-16 font-semibold text-[#8337D9]'>Total</div>
            </div>
          </div>
          <div className='flex flex-row items-center gap-4'>
            <span className='font-bold text-black text-2xl'>50 THB</span>
            <span className='text-gray-400 text-2xl'>{'→'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subhome