import React, { useState } from 'react';
import Dashbord from '../subcomponents/dashbord';
import SubReserve from '../subcomponents/subreserve';

function Reserve() {
  return (
    <div className='flex flex-col gap-4 bg-white min-h-screen'>
      <Dashbord className="items-center"/>
      <SubReserve/>
    </div>
  );
}

export default Reserve