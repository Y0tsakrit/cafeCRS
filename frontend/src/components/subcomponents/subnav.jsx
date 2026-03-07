import React from 'react'
import { Link } from 'react-router-dom';

function Subnav() {
  return (
    <div className='flex flex-row md:flex-col gap-4 md:gap-8 bg-[#F5F5F5] md:p-9 px-4 py-3 border-[#F5F5F5] rounded-2xl md:min-w-35 text-center'>
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