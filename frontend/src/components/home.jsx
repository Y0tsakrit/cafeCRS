import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='flex flex-col justify-center items-center bg-[#8337D9] px-4 md:px-8 h-screen text-white'>
      <div className='flex flex-col items-center max-w-2xl text-center'>
        <h1 className='mb-4 font-bold text-3xl md:text-5xl'>Your Space to Study, Play, and Connect</h1>
        <p className='mb-6 text-base md:text-lg'>
          Need a quiet place to study, attend online classes, or relax with games after school? Our internet café provides everything you need—fast internet, modern computers, and a welcoming atmosphere.
        </p>
        <Link to="/reserve" className='bg-white hover:bg-[#8337D9] px-6 py-3 border-2 border-white rounded-lg font-bold text-[#8337D9] hover:text-white transition-colors'>
          Make A Reservation
        </Link>
      </div>
    </div>
  );
}

export default Home;