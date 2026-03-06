import React from 'react'
import Subnav from '../subcomponents/subnav'
import Dashbord from '../subcomponents/dashbord'

function Resetpassword() {
  return (
        <div className='flex flex-col gap-4 bg-white h-screen'>
        <Dashbord className="items-center"/>
        <div className='flex flex-row gap-8 ml-19'>
            <Subnav/>
                <form className='flex flex-col gap-6'>
                    <div className='text-3xl'>Change Password</div>
                    <div className='flex flex-col gap-1.5'>
                        <div className='text-lg'>Current Password</div>
                        <input type="password" className='p-2 border border-black rounded-2xl'></input>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <div className='text-lg'>New Password</div>
                        <input type="password" className='p-2 border border-black rounded-2xl'></input>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <div className='text-lg'>Confirm Password</div>
                        <input type="password" className='p-2 border border-black rounded-2xl'></input>
                    </div>
                    <button type='submit' className='bg-[#8337D9] p-3 border border-[#8337D9] rounded-2xl text-white'>Confirm</button>
                </form>
        </div>
    </div>
  )
}

export default Resetpassword