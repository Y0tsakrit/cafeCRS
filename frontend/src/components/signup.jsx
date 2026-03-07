import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const router = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const toggleView = () => {
    setIsSignIn(!isSignIn);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (!data.token) return;
      localStorage.setItem('token', data.token);
      try {
        const payload = JSON.parse(atob(data.token.split('.')[1]));
        const role = payload.role?.toUpperCase();
        if (role === 'ADMIN' || role === 'STAFF') {
          router('/staffhome');
        } else {
          router('/mainpage');
        }
      } catch {
        router('/mainpage');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleSignin = (e) => {
    fetch('http://localhost:8000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, fname: firstName, lname: lastName })
    })
    .then(response => response.json())
    .then(data => {
      alert("Signup successful!");
    })
    .catch(error => {
      error.preventDefault();
      console.error('Error:', error);
    });
  };

  return (
    <div className='flex justify-center items-center bg-[#8337D9] px-4 w-screen h-screen'>
      <div className='relative flex flex-col items-center self-center gap-1 bg-white shadow-lg p-6 md:p-8 rounded-2xl w-full sm:w-[80%] md:w-[50%] lg:w-[35%] xl:w-[30%]'>
        <div className='font-bold text-black md:text-[50px] text-3xl'>Internet Cafe</div>
        <div className='text-[#8B8989] md:text-[30px] text-xl'>{isSignIn ? 'Welcome Back!' : 'Welcome!'}</div>
        <div className='flex flex-row justify-between bg-[#E5E5E5] p-1 rounded-lg w-full'>
          <button 
            className={`flex-1 rounded-lg text-center p-2 transition-colors duration-300 ${isSignIn ? 'bg-white font-bold text-[#8337D9]' : 'bg-[#E5E5E5] text-black'}`} 
            onClick={() => setIsSignIn(true)}>
            Login
          </button>
          <button 
            className={`flex-1 rounded-lg text-center p-2 transition-colors duration-300 ${!isSignIn ? 'bg-white font-bold text-[#8337D9]' : 'bg-[#E5E5E5] text-black'}`} 
            onClick={() => setIsSignIn(false)}>
            Register
          </button>
        </div>
        {isSignIn ? (
          <form className='flex flex-col gap-4 w-full' onSubmit={handleLogin}>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Email</label>
              <input type='text' className='p-2 border border-gray-300 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Password</label>
              <input type='password' className='p-2 border border-gray-300 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='text-[#8B8989] text-sm text-right cursor-pointer'>Forgot Your Password?</div>
            <button type='submit' className='bg-[#8337D9] mt-4 px-4 py-2 rounded-lg font-bold text-white'>Login</button>
          </form>
        ) : (
          <form className='flex flex-col gap-4 w-full' onSubmit={handleSignin}>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>First Name</label>
              <input type='text' className='p-2 border border-gray-300 rounded-lg' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Last Name</label>
              <input type='text' className='p-2 border border-gray-300 rounded-lg' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Email</label>
              <input type='text' className='p-2 border border-gray-300 rounded-lg' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Password</label>
              <input type='password' className='p-2 border border-gray-300 rounded-lg' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='submit' className='bg-[#8337D9] mt-4 px-4 py-2 rounded-lg font-bold text-white'>Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;