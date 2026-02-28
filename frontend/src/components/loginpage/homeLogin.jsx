import React from 'react'
import Dashbord from '../subcomponents/dashbord'
import Subnav from '../subcomponents/subnav'
import Subhome from '../subcomponents/subhome'
function HomeLogin() {
    return (
    <div className='flex flex-col gap-4 bg-white h-screen'>
        <Dashbord className="items-center"/>
        <div className='flex flex-row gap-3 ml-19 w-screen'>
            <Subnav/>
            <Subhome/>
        </div>
    </div>
    )
}

export default HomeLogin