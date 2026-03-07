import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { MdBarChart, MdTableRows, MdMenuBook, MdManageAccounts, MdLogout, MdMenu } from 'react-icons/md'
import { IoPersonCircleOutline } from 'react-icons/io5'

const ALL_NAV_ITEMS = [
  { label: 'Sale Report',     icon: <MdBarChart size={24} />,       path: '/staffhome',     roles: ['ADMIN'] },
  { label: 'View Status',     icon: <MdTableRows size={24} />,      path: '/staffstatus',   roles: ['ADMIN', 'STAFF'] },
  { label: 'Edit Menu',       icon: <MdMenuBook size={24} />,       path: '/staffmenu',     roles: ['ADMIN', 'STAFF'] },
  { label: 'Manage Accounts', icon: <MdManageAccounts size={24} />, path: '/staffaccounts', roles: ['ADMIN'] },
];

function Subnavstaff() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [open, setOpen] = useState(false);

  let role = 'STAFF';
  try {
    const token = localStorage.getItem('token');
    role = JSON.parse(atob(token.split('.')[1])).role?.toUpperCase() || 'STAFF';
  } catch {}

  const navItems = ALL_NAV_ITEMS.filter(item => item.roles.includes(role));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:8000/api/users/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => data && setProfile({ name: data.fname ? `${data.fname} ${data.lname || ''}`.trim() : (data.name || data.email || ''), email: data.email || '' }))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className='md:hidden flex justify-between items-center bg-[#8337D9] px-4 py-3 w-full'>
        <span className='font-bold text-white text-lg'>Staff Panel</span>
        <button onClick={() => setOpen(o => !o)} className='text-white'>
          <MdMenu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        flex flex-col justify-between bg-[#8337D9] py-6 shrink-0 transition-all duration-200 overflow-y-auto
        fixed md:sticky md:top-0 md:h-screen z-40 top-0 left-0 h-full
        ${open ? 'w-64 px-4' : 'w-0 overflow-hidden md:w-64 md:px-4'}
      `}>
        <div>
          <div className='flex justify-end mb-4'>
            <IoPersonCircleOutline className='text-white text-3xl' />
          </div>
          <div className='flex flex-col items-center mb-8'>
            <div className='bg-white mb-3 rounded-full w-20 md:w-24 h-20 md:h-24' />
            <div className='font-bold text-white text-base md:text-lg text-center leading-tight'>{profile.name || 'Staff'}</div>
            <div className='text-purple-200 text-xs md:text-sm text-center break-all'>{profile.email}</div>
          </div>

          <nav className='flex flex-col gap-1'>
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-white text-left transition ${active ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  {item.icon}
                  <span className='font-medium whitespace-nowrap'>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className='flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-bold text-white transition'
        >
          <MdLogout size={22} />
          Logout
        </button>
      </div>

      {/* Overlay for mobile */}
      {open && <div className='md:hidden z-30 fixed inset-0 bg-black/30' onClick={() => setOpen(false)} />}
    </>
  );
}

export default Subnavstaff