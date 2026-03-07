import React, { useState } from 'react'
import Subnav from '../subcomponents/subnav'
import Dashbord from '../subcomponents/dashbord'

function Resetpassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    fetch('http://localhost:8000/api/users/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ oldPassword, newPassword })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            const msg = err.trace?.split('\n')[0]?.replace(/^.*?:\s*/, '') || 'Something went wrong.';
            throw new Error(msg);
          });
        }
        return res.text();
      })
      .then(text => {
        setMessage(text);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch(err => setError(err.message));
  };

  return (
        <div className='flex flex-col gap-4 bg-white h-screen'>
        <Dashbord className="items-center"/>
        <div className='flex md:flex-row flex-col gap-4 md:gap-8 px-2 md:px-4'>
            <Subnav/>
                <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                    <div className='text-3xl'>Change Password</div>
                    {message && <div className='text-green-600'>{message}</div>}
                    {error && <div className='text-red-500'>{error}</div>}
                    <div className='flex flex-col gap-1.5'>
                        <div className='text-lg'>Current Password</div>
                        <input type="password" className='p-2 border border-black rounded-2xl' value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <div className='text-lg'>New Password</div>
                        <input type="password" className='p-2 border border-black rounded-2xl' value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <div className='text-lg'>Confirm Password</div>
                        <input type="password" className='p-2 border border-black rounded-2xl' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type='submit' className='bg-[#8337D9] p-3 border border-[#8337D9] rounded-2xl text-white'>Confirm</button>
                </form>
        </div>
    </div>
  )
}

export default Resetpassword