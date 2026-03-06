import Payment from '../subcomponents/payment';
import ShowTerm from '../subcomponents/showterm';
import Confirm from '../subcomponents/confirm';
import React, { useState } from 'react';
function SubReserve() {

      // Mock seat status data
    const seatStatus = {
        A1: 'available', A2: 'available', A3: 'reserved', A4: 'reserved', A5: 'reserved', A6: 'available', A7: 'reserved', A8: 'reserved',
        B1: 'available', B2: 'available', B3: 'reserved', B4: 'reserved', B5: 'reserved', B6: 'not-available', B7: 'reserved', B8: 'reserved',
        C1: 'available', C2: 'available', C3: 'available', C4: 'available', C5: 'not-available', C6: 'reserved', C7: 'reserved', C8: 'reserved',
        D1: 'available', D2: 'available', D3: 'available', D4: 'reserved', D5: 'reserved', D6: 'reserved', D7: 'reserved', D8: 'reserved',
        E1: 'available', E2: 'available', E3: 'reserved', E4: 'reserved', E5: 'reserved', E6: 'not-available', E7: 'not-available', E8: 'reserved',
        F1: 'reserved', F2: 'reserved', F3: 'reserved', F4: 'reserved', F5: 'reserved', F6: 'reserved', F7: 'reserved', F8: 'reserved',
    };
    const seatRows = ['A','B','C','D','E','F'];
    const seatCols = [1,2,3,4,5,6,7,8];
    const getSeatKey = (row, col) => row + col;
    const getSeatColor = status => status === 'available' ? 'bg-green-100 text-green-900 border-green-400' : status === 'not-available' ? 'bg-red-100 text-red-700 border-red-400' : 'bg-gray-200 text-gray-700 border-gray-300';

    // Icon URLs for more realistic look
    const iconFood = 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png';
    const iconRestroom = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png';
    const iconPlayground = 'https://cdn-icons-png.flaticon.com/512/3076/3076922.png';

    // Modal state
    const [showTerm, setShowTerm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Handler for Payment's Continue button
    const handlePaymentContinue = () => setShowTerm(true);
    // Handler for ShowTerm's Continue button
    const handleTermAgree = () => {
        setShowTerm(false);
        setShowConfirm(true);
    };
    // Handler for Confirm's close
    const handleConfirmClose = () => setShowConfirm(false);



  return (
    <div className="flex flex-col px-8 w-full">
        {/* Date/Time Selectors */}
            <div className="flex flex-row justify-center items-center gap-2 bg-gray-50 mt-6 mb-4 py-4 border border-gray-200 rounded-2xl w-full" style={{maxWidth:'100%', minWidth:600}}>
                <div className="flex flex-row flex-1 justify-center items-center gap-8">
                    <div className="flex flex-col items-center px-4">
                        <span className="font-semibold text-purple-600 text-lg">Select Date</span>
                        <span className="mt-1 font-extrabold text-2xl">01/01/2026</span>
                    </div>
                    <div className="border-gray-300 border-l h-10"/>
                    <div className="flex flex-col items-center px-4">
                    <span className="font-semibold text-purple-600 text-lg">Start Time</span>
                    <span className="mt-1 font-extrabold text-2xl">18.00</span>
                    </div>
                    <div className="border-gray-300 border-l h-10"/>
                    <div className="flex flex-col items-center px-4">
                    <span className="font-semibold text-purple-600 text-lg">End Time</span>
                    <span className="mt-1 font-extrabold text-2xl">19.00</span>
                    </div>
                </div>
            </div>

        {/* Seat Map */}
        <div className="bg-[#f7f8fa] mx-auto mt-2 p-8 border border-gray-200 rounded-2xl w-[90%]" style={{maxWidth:'98vw'}}>
          <div className="flex flex-row items-start gap-8 mb-2">
            {/* Icons */}
            <div className="flex flex-col gap-8 mt-2">
              <div className="flex justify-center items-center bg-black rounded w-20 h-20">
                <img src={iconFood} alt="food" className="w-12 h-12" />
              </div>
              <div className="flex justify-center items-center bg-black rounded w-20 h-20">
                <img src={iconRestroom} alt="restroom" className="w-12 h-12" />
              </div>
              <div className="flex justify-center items-center bg-black rounded w-20 h-20">
                <img src={iconPlayground} alt="playground" className="w-12 h-12" />
              </div>
            </div>
            {/* Seat grid and privates */}
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-row gap-2 mb-2 ml-20">
                <div className="flex justify-center items-center bg-gray-200 border border-gray-300 rounded w-56 h-30 font-bold text-gray-600 text-xl">Private 1</div>
                <div className="flex justify-center items-center bg-gray-200 border border-gray-300 rounded w-56 h-30 font-bold text-gray-600 text-xl">Private 2</div>
              </div>
              {/* Seat grid */}
              <div className="flex flex-col w-full">
                <div className="gap-3 grid grid-cols-8 w-full">
                  {seatRows.map(row => seatCols.map(col => {
                    const key = getSeatKey(row, col);
                    const status = seatStatus[key] || 'reserved';
                    return (
                      <div
                        key={key}
                        className={`w-16 h-12 rounded flex font-bold border-2 text-lg ${getSeatColor(status)} ${status === 'available' ? 'cursor-pointer hover:ring-2 ring-green-400' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                      >
                        {key}
                      </div>
                    );
                  }))}
                </div>
              </div>
          </div>
        </div>
        <Payment onContinue={handlePaymentContinue}/>
      </div>
      <ShowTerm show={showTerm} onClose={() => setShowTerm(false)} onAgree={handleTermAgree}/>
      <Confirm show={showConfirm} onClose={handleConfirmClose}/>
    </div>
  )
}

export default SubReserve