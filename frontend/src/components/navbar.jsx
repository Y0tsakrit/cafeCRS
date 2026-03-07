import React, { useState } from 'react';
import { RiComputerLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdMenu, MdClose } from "react-icons/md";

function Navbar() {
    const [activePage, setActivePage] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { to: '/', label: 'Home', key: 'Home' },
        { to: '/about', label: 'About Us', key: 'About' },
        { to: '/service', label: 'Services', key: 'Services' },
        { to: '/contact', label: 'Contact Us', key: 'Contact' },
        { to: '/faq', label: 'FAQ', key: 'FAQ' },
    ];

    const iconClass = (key) =>
        `cursor-pointer ${activePage === key ? 'underline underline-offset-8' : ''}`;

    return (
        <div className='top-0 z-50 relative sticky flex flex-row justify-between items-center bg-[#8337D9] px-6 py-4'>
            {/* Logo */}
            <div className='flex flex-row items-center gap-4'>
                <RiComputerLine className='text-white text-4xl' />
                <div className='font-bold text-white md:text-[24px] text-xl'>Internet Cafe</div>
            </div>

            {/* Desktop nav */}
            <div className='hidden md:flex flex-row items-center gap-8 text-white text-lg'>
                {navLinks.map(({ to, label, key }) => (
                    <Link key={key} to={to} className={iconClass(key)} onClick={() => setActivePage(key)}>
                        {label}
                    </Link>
                ))}
                <div className='flex items-center gap-4'>
                    <Link to='/order' onClick={() => setActivePage('')}>
                        <MdOutlineShoppingCart className='text-white text-3xl' />
                    </Link>
                    {localStorage.getItem('token') ? (
                        <Link to='/mainpage' className='flex items-center gap-2' onClick={() => setActivePage('')}>
                            <IoPersonCircleOutline className='text-white text-3xl' />
                        </Link>
                    ) : (
                        <Link to='/signin' onClick={() => setActivePage('')}
                            className='hover:bg-white px-4 py-2 border-4 border-white rounded-lg text-white hover:text-[#8337D9] transition-colors'>
                            Sign In
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile: cart + person + hamburger */}
            <div className='md:hidden flex items-center gap-3 text-white'>
                <Link to='/order' onClick={() => { setActivePage(''); setMenuOpen(false); }}>
                    <MdOutlineShoppingCart className='text-white text-2xl' />
                </Link>
                {localStorage.getItem('token') ? (
                    <Link to='/mainpage' onClick={() => { setActivePage(''); setMenuOpen(false); }}>
                        <IoPersonCircleOutline className='text-white text-2xl' />
                    </Link>
                ) : (
                    <Link to='/signin' onClick={() => { setActivePage(''); setMenuOpen(false); }}
                        className='px-2 py-1 border-2 border-white rounded-md text-sm'>
                        Sign In
                    </Link>
                )}
                <button onClick={() => setMenuOpen(!menuOpen)} className='text-white text-2xl'>
                    {menuOpen ? <MdClose /> : <MdMenu />}
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className='md:hidden top-full right-0 left-0 z-50 absolute flex flex-col gap-4 bg-[#8337D9] shadow-lg px-6 py-5 text-white text-lg'>
                    {navLinks.map(({ to, label, key }) => (
                        <Link key={key} to={to} className={iconClass(key)}
                            onClick={() => { setActivePage(key); setMenuOpen(false); }}>
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Navbar