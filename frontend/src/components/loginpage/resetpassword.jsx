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
        <div className="flex flex-col gap-6 bg-white min-h-screen">
        <Dashbord className="items-center"/>
        <div className="flex md:flex-row flex-col gap-6 w-full max-w-[95%] mx-auto">
            <Subnav/>
        <div className="flex flex-1 justify-center">
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full max-w-md p-8 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8337D9] focus:border-transparent"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              Change Password
            </h2>

            {message && (
              <div className="text-green-500 text-sm bg-green-50 p-2 rounded">
                {message}
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                className="p-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8337D9] focus:border-transparent"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="p-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8337D9] focus:border-transparent"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="p-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8337D9] focus:border-transparent"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#8337D9] hover:bg-[#722cc0] transition text-white py-2.5 rounded-lg font-medium"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Resetpassword