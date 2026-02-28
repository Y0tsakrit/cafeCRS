import React from 'react'

function FAQ() {
  return (
    <div className='bg-white p-10 w-screen min-h-screen'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 font-bold text-[45px]'>Frequently Asked Questions (FAQ)</h1>
        <hr /><br/>
        
        {/* Internet and PC Usage Section */}
        <div className='mb-12'>
          <h2 className='mb-4 font-bold text-purple-600 text-2xl'>Internet and PC Usage</h2>
          
          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Do I need to book a PC or seat in advance?</h3>
            <p className='text-gray-700'>No. All seats must be assigned by a registered member before use. Walk-in use is allowed for unregistered guests, but booking is advised.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Can staff help me book a seat?</h3>
            <p className='text-gray-700'>Yes, unfortunately, our staff cannot made bookings on your behalf. All bookings must be completed by members through the booking system.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Can I reserve more than one seat?</h3>
            <p className='text-gray-700'>Yes, you're allowed to book seats, with a single chair/seat, which is ideal for friends or group meetups.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Can I use my own laptop or device?</h3>
            <p className='text-gray-700'>Yes, members are welcome to bring their own laptops and connect to our Wi-Fi.</p>
          </div>
        </div>
        <hr /><br/>

        {/* Pricing and Time Packages Section */}
        <div className='mb-12'>
          <h2 className='mb-4 font-bold text-purple-600 text-2xl'>Pricing and Time Packages</h2>
          
          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>What is the hourly rate for regular seating?</h3>
            <p className='text-gray-700'>Regular seating is 20฿-70฿ per seat per hour.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Do you offer private rooms?</h3>
            <p className='text-gray-700'>Yes, private rooms are available for groups, meetings, study sessions, or private gaming.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>How much does a private room cost?</h3>
            <p className='text-gray-700'>Pricing spaces vary at 220฿-750฿ per room per hour, regardless of the number of places in the room (some room capacity).</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Do private rooms also require booking?</h3>
            <p className='text-gray-700'>Yes. Private rooms must be reserved in advance by a member, just like regular seating.</p>
          </div>
        </div>
        <hr /><br/>

        {/* Food and Drinks Section */}
        <div className='mb-12'>
          <h2 className='mb-4 font-bold text-purple-600 text-2xl'>Food and Drinks</h2>
          
          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Do I need to buy food or drinks to use the space?</h3>
            <p className='text-gray-700'>No, ordering food or drinks is optional.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>What food and drinks are available?</h3>
            <p className='text-gray-700'>We can view our full selection of coffee, drinks, and snacks on our menu page.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Can I bring outside food or drinks?</h3>
            <p className='text-gray-700'>Outside food and drinks may not be allowed. Please check with our staff before ordering any food.</p>
          </div>
        </div>
        <hr /><br/>

        {/* Rules and Policies Section */}
        <div className='mb-12'>
          <h2 className='mb-4 font-bold text-purple-600 text-2xl'>Rules and Policies</h2>
          
          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Can I eat and drink at my seat or in private rooms?</h3>
            <p className='text-gray-700'>Yes, as long as food and drinks are handled carefully and equipment is kept clean.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>Can I extend my booking time?</h3>
            <p className='text-gray-700'>Extensions are possible if the seat or room is available and must be made through the booking system by the member.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>What is your refund policy?</h3>
            <p className='text-gray-700'>Cancellations must be made at least 1 day before booking at least 30 minutes before the scheduled start time.</p>
          </div>

          <div className='mb-6'>
            <h3 className='mb-2 font-semibold text-lg'>How do I cancel my booking?</h3>
            <p className='text-gray-700'>All cancellations must be made by the member through the booking system. Staff members are able to cancel bookings on behalf of members under some circumstances.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ