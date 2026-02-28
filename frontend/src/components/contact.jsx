import React from 'react'
import { RiComputerLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
function Contact() {
  return (
    <div className='bg-white p-10 w-screen min-h-screen'>
        <div className='flex flex-row'>
            <div className='mx-auto max-w-4xl'>
                <div className='mb-16'>
                <h1 className='mb-6 font-bold text-6xl'>Contact Us</h1>
                <div className='text-lg'>
                    <p>Got a question? Need help? Or just want to know more about our café?<br/>
                    We're always happy to hear from you!<br/><br/>
                    Whether you're asking about our internet services, PC availability,<br/>
                    pricing, menu items, or opening hours, feel free to reach out. Our team<br/>
                    will do our best to get back to you as soon as possible.<br/><br/>
                    If you're already planning a visit, you're also welcome to stop by and talk<br/>
                    to us in person — sometimes that's the easiest way.</p>
                </div>
                </div>
                <div>
                <h2 className='mb-6 font-bold text-5xl'>Before You Contact Us</h2>
                <p className='mb-4 text-lg'>You might find what you're looking for on our <Link to="/faq" className='text-blue-600 underline'>FAQ page</Link>, where we've answered common questions about:</p>
                <ul className='space-y-2 ml-6 text-lg'>
                    <li>• Internet and PC usage</li>
                    <li>• Pricing and time packages</li>
                    <li>• Food and drinks</li>
                    <li>• Rules and policies</li>
                </ul>
                </div>
            </div>
                <div className='space-y-8'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-purple-100 p-4 rounded-full'>
                            <svg className='w-8 h-8 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                            </svg>
                        </div>
                        <div>
                            <p className='font-semibold text-xl'>(+66) 0000000000</p>
                        </div>
                    </div>
    
                    <div className='flex items-center gap-4'>
                        <div className='bg-purple-100 p-4 rounded-full'>
                            <svg className='w-8 h-8 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                            </svg>
                        </div>
                        <div>
                            <p className='font-semibold text-xl'>internetcafe@domain.com</p>
                        </div>
                    </div>
    
                    <div className='flex items-center gap-4'>
                        <div className='bg-purple-100 p-4 rounded-full'>
                            <svg className='w-8 h-8 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                            </svg>
                        </div>
                        <div>
                            <p className='font-semibold text-xl'>123/45 KMITL</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Contact