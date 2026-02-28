import React, { useState } from 'react';

function Signup() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleView = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className='flex justify-center items-center bg-[#8337D9] w-screen h-screen'>
      <div className='relative flex flex-col items-center self-center gap-1 bg-white shadow-lg p-8 rounded-2xl w-[30%]'>
        <div className='font-bold text-[50px] text-black'>Internet Cafe</div>
        <div className='text-[#8B8989] text-[30px]'>{isSignIn ? 'Welcome Back!' : 'Welcome!'}</div>
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
          <form className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Email</label>
              <input type='text' className='p-2 border border-gray-300 rounded-lg' />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Password</label>
              <input type='password' className='p-2 border border-gray-300 rounded-lg' />
            </div>
            <div className='text-[#8B8989] text-sm text-right cursor-pointer'>Forgot Your Password?</div>
            <button type='submit' className='bg-[#8337D9] mt-4 px-4 py-2 rounded-lg font-bold text-white'>Login</button>
          </form>
        ) : (
          <form className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Username</label>
              <input type='text' className='p-2 border border-gray-300 rounded-lg' />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Email</label>
              <input type='text' className='p-2 border border-gray-300 rounded-lg'/>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-black text-left'>Password</label>
              <input type='password' className='p-2 border border-gray-300 rounded-lg' />
            </div>
            <button type='submit' className='bg-[#8337D9] mt-4 px-4 py-2 rounded-lg font-bold text-white'>Register</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Signup;