import React from 'react'
import Dashbord from '../subcomponents/dashbord'
import Subnav from '../subcomponents/subnav'
import Subhome from '../subcomponents/subhome'
function HomeLogin() {
    return (
    <div className='flex flex-col gap-4 bg-white p-5 h-full'>
        <Dashbord className="items-center"/>
        <div className='flex md:flex-row flex-col gap-3 px-2 md:px-4'>
            <Subnav/>
            <Subhome/>
        </div>
    </div>
    )
}

export default HomeLogin