import React from 'react'
import Dashbord from '../subcomponents/dashbord'
import Subnav from '../subcomponents/subnav'
import Subhome from '../subcomponents/subhome'

function HomeLogin() {
  return (
    <div className="flex flex-col gap-6 bg-white min-h-screen">
      <Dashbord className="items-center" />

      <div className="flex md:flex-row flex-col gap-6 w-full max-w-[95%] mx-auto">
        <Subnav />
        <Subhome />
      </div>
    </div>
  )
}

export default HomeLogin