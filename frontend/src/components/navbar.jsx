import React, { useEffect, useState } from 'react';
import { RiComputerLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";

function Navbar() {

    const [activePage, setActivePage] = useState("");

    return (
        <div className='flex flex-row justify-between items-center bg-[#8337D9] px-8 py-4'>
        <div className='flex flex-row items-center gap-4'>
            <RiComputerLine className='text-white text-4xl' />
            <div className='font-bold text-[24px] text-white'>Internet Cafe</div>
        </div>
        <div className='flex flex-row items-center gap-8 text-white text-lg'>
            <Link 
                to='/' 
                className={`cursor-pointer ${activePage === "Home" ? 'underline underline-offset-8' : ''}`} 
                onClick={() => setActivePage("Home")}
            >
                Home
            </Link>
            <Link 
                to='/about' 
                className={`cursor-pointer ${activePage === "About" ? 'underline underline-offset-8' : ''}`} 
                onClick={() => setActivePage("About")}
            >
                About Us
            </Link>
            <Link 
                to='/service'
                className={`cursor-pointer ${activePage === "Services" ? 'underline underline-offset-8' : ''}`} 
                onClick={() => setActivePage("Services")}
            >
                Services
            </Link>
            <Link
                to='/contact'
                className={`cursor-pointer ${activePage === "Contact" ? 'underline underline-offset-8' : ''}`} 
                onClick={() => setActivePage("Contact")}
            >
                Contact Us
            </Link>
            <Link
                to='/faq'
                className={`cursor-pointer ${activePage === "FAQ" ? 'underline underline-offset-8' : ''}`} 
                onClick={() => setActivePage("FAQ")}
            >
                FAQ
            </Link>
            {localStorage.getItem('token') ? (
                <Link to='/mainpage' className='flex items-center gap-2' onClick={() => setActivePage("")}>
                    <IoPersonCircleOutline className='text-white text-3xl' />
                </Link>
            ) : (
                <Link 
                    to='/signin'
                    onClick={() => setActivePage("")}
                    className='hover:bg-white px-4 py-2 border-4 border-white rounded-lg text-white hover:text-[#8337D9] transition-colors'>
                    Sign In
                </Link>
            )}
        </div>
        </div>
    );
}

export default Navbar