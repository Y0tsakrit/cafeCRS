import React from 'react'
import { Link } from 'react-router-dom';

function Subnav() {
  return (
    <div className='flex flex-col gap-8 bg-[#F5F5F5] p-9 border-[#F5F5F5] rounded-2xl text-center'>
      <Link
      to='/mainpage'
      >
        Main Page
      </Link>
      <Link
      to='/resetpassword'
      >
        Change Password
      </Link>
      <Link
      to='/history'
      >
        History
      </Link>
    </div>
  )
}

export default Subnav