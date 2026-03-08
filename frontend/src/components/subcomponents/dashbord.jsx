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
    <div className="w-full flex justify-center mt-6 px-4">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6
      bg-[#8337D9] rounded-xl p-6 w-full max-w-[95%]">

        {/* User Info */}
        <div className="flex flex-col text-white">
          <div className="text-2xl md:text-4xl font-semibold">
            Hello, {userFName} {userLName}
          </div>

          <div className="text-sm md:text-lg opacity-90">
            {email}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-row flex-wrap items-center gap-4 md:gap-6">

          {/* Balance Card */}
          <Link
            to="/topup"
            className="flex items-center gap-4 bg-white rounded-xl px-5 py-3
            hover:shadow-md transition"
          >
            <div className="flex flex-col text-[#8337D9]">
              <span className="text-sm font-medium">
                Balance
              </span>
              <MdOutlineAccountBalanceWallet size={26} />
            </div>

            <div className="text-2xl md:text-4xl font-bold text-[#8337D9]">
              {balance.toFixed(2)}
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="flex items-center gap-2 bg-[#DA0000] hover:bg-red-700
            text-white rounded-xl px-4 py-3 transition"
          >
            <RiLogoutBoxRLine size={24} />
            <span className="font-medium">Logout</span>
          </button>

        </div>
      </div>
    </div>
  );
}

export default Dashbord;