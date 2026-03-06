import React from 'react'
import {menus} from '../contraint/data'
function Order() {
    console.log(menus)
  return (
    <div className='bg-white pt-3 pl-3 h-screen'>
        <div className='mb-15'>
            <div className='text-2xl'>Our Menu</div>
            <div>Welcome to our menu — your go-to stop for coffee, drinks, and quick bites while you work, study, or game.</div>
        </div>
        <div className='grid grid-cols-2'>
            <div className='flex flex-col gap-10 ml-10'>
                <div><b className='text-xl'>Menu</b></div>
                {menus.map((item, index) =>(
                    <div className='items-center grid grid-cols-2'>
                       <div key={index}>{item.name}</div>
                       <div key={index} className='flex flex-row gap-2'>{item.price} THB<div className='bg-gray-200 px-3 py-1 border border-gray-200 rounded-xl text-center'>+</div></div>
                    </div>
                ))}  
            </div>
            <div className='flex flex-col gap-2 ml-10'>
                <b className='text-xl'>Cart</b>
                <label for="cars">Select Seat</label>
                <select id="cars" name="cars" className='bg-gray-200 border border-gray-400 w-[20%] h-5'>
                    <option value="volvo" selected className='text-sm'>1</option>
                    <option value="saab">2</option>
                </select>
                <div className='text-[#8337D9]'><b>item</b></div>
                <div className='grid grid-cols-2'>
                    <div className='text-[#8337D9] text-lg'><b>Total</b></div>
                    <div className='text-lg'><b>50 THB</b></div>
                </div>
                <div className='justify-center bg-[#05E81F] p-2 border border-[#05E81F] rounded-lg w-[30%] text-white text-center'>Process</div>
            </div>
        </div>
    </div>
  )
}

export default Order