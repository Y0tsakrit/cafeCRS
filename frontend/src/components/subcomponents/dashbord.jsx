import React from 'react'
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Dashbord() {
  return (
          <div className='flex flex-row justify-between self-center bg-[#8337D9] mt-5 p-7 border rounded-xl w-[90%]'>
        <div className=''>
          <div className='text-[40px] text-white'>Hello, Username!</div>
          <div className='text-[25px] text-white'>email@domain.com</div>
        </div>
        <div className='flex flex-row self-center gap-10'>
            <div className='flex flex-row items-center gap-7 bg-white p-3 rounded-2xl'>
                <div className='flex flex-col gap-2'>
                    <div className='text-[#8337D9] text-[20px]'>Balance</div>
                    <div ><MdOutlineAccountBalanceWallet size='32' className="text-[#8337D9]"/></div>
                </div>
                <div className='text-[#8337D9] text-[50px]'>0.00</div>
            </div>
            <div className='flex flex-row self-center bg-[#DA0000] p-3 border-[#DA0000] rounded-2xl'>
                <div><RiLogoutBoxRLine size='35' className="text-white"/></div>
                <div className="text-[20px] text-white">Logout</div>
            </div>
        </div>
      </div>
  )
}

export default Dashbord