import React from 'react'

function Service1() {
  return (
        <div className='flex flex-col items-center self-center p-30 py-10 w-screen text-white text-center'>
            <h1 className='mb-6 font-bold text-4xl'>Our Services</h1>
            <div className='flex flex-row justify-center space-x-6'>
                <div className='bg-white shadow-lg p-6 rounded-lg w-1/3 text-black'>
                    <div className='flex justify-center items-center w-full h-40'>
                        <img src='/foodDrink.png' alt='Gaming Seats' className='rounded-full w-32 h-32 object-cover' />
                    </div>
                    <h2 className='mt-4 font-semibold text-xl'>Food & Drinks</h2>
                    <p className='mt-2 text-sm'>Long sessions need the right fuel. Our Food & Drinks selection includes coffee, refreshing beverages, and easy-to-eat snacks made for study marathons and gaming sessions.</p>
                </div>
                <div className='bg-white shadow-lg p-6 rounded-lg w-1/3 text-black'>
                    <div className='flex justify-center items-center w-full h-40'>
                        <img src='/gameSeat.png' alt='Gaming Seats' className='rounded-full w-32 h-32 object-cover' />
                    </div>
                    <h2 className='mt-4 font-semibold text-xl'>Gaming Seats</h2>
                    <p className='mt-2 text-sm'>Our gaming seats are built for performance and comfort. Whether you're playing competitively or just having fun with friends, you'll get a smooth and reliable experience every time.</p>
                </div>
                <div className='bg-white shadow-lg p-6 rounded-lg w-1/3 text-black'>
                    <div className='flex justify-center items-center w-full h-40'>
                        <img src='/privateRoom.png' alt='Private Rooms' className='rounded-full w-32 h-32 object-cover' />
                    </div>
                    <h2 className='mt-4 font-semibold text-xl'>Private Rooms</h2>
                    <p className='mt-2 text-sm'>Need privacy for group gaming, meetings, or study sessions? Our private rooms give you a quiet, exclusive space without distractions.</p>
                </div>
            </div>
            <p className='mt-6'>Interested? Make a reservation <a href='/reservation' className='text-blue-300 underline'>here</a>.</p>
        </div>
  )
}

export default Service1