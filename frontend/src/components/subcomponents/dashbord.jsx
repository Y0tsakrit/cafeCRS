import React, {useEffect, useState } from 'react'
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Dashbord() {

  const [balance, setBalance] = useState(0);
  const [userFName, setFName] = useState('');
  const [userLName, setLName] = useState('');
  const [email, setEmail] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      setBalance(data.balance);

      const token = localStorage.getItem("token");

      if (token) {
        const decoded = await jwtDecode(token);
        setFName(decoded.firstName || decoded.fname || '');
        setLName(decoded.lastName || decoded.lname || '');
        setEmail(decoded.email || '');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchData();
}, []);
  return (
          <div className='flex md:flex-row flex-col justify-between self-center gap-4 bg-[#8337D9] mt-5 p-4 md:p-7 border rounded-xl w-[90%]'>
        <div className=''>
          <div className='text-white md:text-[40px] text-2xl'>Hello, {userFName} {userLName}!</div>
          <div className='text-white md:text-[25px] text-lg'>{email}</div>
        </div>
        <div className='flex flex-row flex-wrap self-center gap-4 md:gap-10'>
            <Link to='/topup' className='flex flex-row items-center gap-4 md:gap-7 bg-white p-3 rounded-2xl'>
                <div className='flex flex-col gap-2'>
                    <div className='text-[#8337D9] md:text-[20px] text-base'>Balance</div>
                    <div ><MdOutlineAccountBalanceWallet size='28' className="text-[#8337D9]"/></div>
                </div>
                <div className='text-[#8337D9] md:text-[50px] text-3xl'>{balance.toFixed(2)}</div>
            </Link>
            <div className='flex flex-row self-center bg-[#DA0000] p-3 border-[#DA0000] rounded-2xl cursor-pointer' onClick={(e) =>{localStorage.clear(); window.location.reload(true);}}>
                <div><RiLogoutBoxRLine size='28' className="text-white"/></div>
                <div className="text-white md:text-[20px] text-base">Logout</div>
            </div>
        </div>
      </div>
  )
}

export default Dashbord