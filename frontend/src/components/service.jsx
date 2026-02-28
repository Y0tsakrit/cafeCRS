import React from 'react';
import Service1 from './subcomponents/service1';
function Service() {
  return (
    <div className='flex flex-col'>
        <Service1/>
        <div className='bg-white p-10'>
          <h1 className='mb-6 font-bold text-3xl text-center'>Our Services</h1>
          <p className='mb-8 text-gray-700 text-center'>We offer more than just internet access. From high-performance gaming setups to private rooms and quick bites, our services are designed to support work, play, and everything in between.</p>
          <div className='space-y-10'>
            <div className='text-left'>
              <h2 className='mb-4 font-semibold text-purple-700 text-2xl'>Gaming Seats</h2>
              <ul className='text-gray-800 list-disc list-inside'>
                <li>High-performance PCs</li>
                <li>Fast, stable internet connection</li>
                <li>Comfortable seating for long sessions</li>
                <li>Suitable for gaming, studying, and everyday use</li>
              </ul>
              <p className='mt-4'><strong>Pricing:</strong> 200 THB per seat per hour</p>
              <p className='text-gray-600 text-sm'>All seats must be reserved by a registered member. Members can book multiple seats in one reservation.</p>
            </div>

            <div className='text-left'>
              <h2 className='mb-4 font-semibold text-purple-700 text-2xl'>Private Rooms</h2>
              <ul className='text-gray-800 list-disc list-inside'>
                <li>Perfect for group gaming sessions, team meetings, or study groups</li>
                <li>Enclosed private space</li>
                <li>Reduced noise and full privacy</li>
                <li>Comfortable setup for group use</li>
              </ul>
              <p className='mt-4'><strong>Pricing:</strong> 2,200 THB per room per hour</p>
              <p className='text-gray-600 text-sm'>Private rooms must be reserved in advance by a member.</p>
            </div>

            <div className='text-left'>
              <h2 className='mb-4 font-semibold text-purple-700 text-2xl'>Food & Drinks</h2>
              <ul className='text-gray-800 list-disc list-inside'>
                <li>Freshly brewed coffee</li>
                <li>Iced drinks and soft drinks</li>
                <li>Light meals and snacks</li>
              </ul>
              <p className='mt-4 text-gray-800'>Whether you're taking a break or eating while you game, our food and drinks are made for convenience and comfort. Visit our menu <a href='/menu' className='text-blue-500 underline'>here</a>.</p>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Service;