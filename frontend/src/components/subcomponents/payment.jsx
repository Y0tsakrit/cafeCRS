import React from 'react'

function Payment({ onContinue }) {
  return (
    <div className="bg-gray-50 mt-8 p-6 border border-gray-200 rounded-xl w-full">
      <h2 className="mb-4 font-bold text-lg">Reservation Details</h2>
      <div className="gap-x-4 gap-y-2 grid grid-cols-2 text-sm">
        <div className="font-bold text-purple-700">Date</div>
        <div>01/01/2026</div>
        <div className="font-bold text-purple-700">Time</div>
        <div>18.00 - 19.00</div>
        <div className="font-bold text-purple-700">Seat ID</div>
        <div>A1, A2</div>
        <div className="font-bold text-purple-700">Quantity</div>
        <div>2</div>
        <div className="font-bold text-purple-700">Unit Price</div>
        <div>200 THB</div>
        <div className="font-bold text-purple-700">Total Price</div>
        <div className="font-bold text-purple-700">400 THB</div>
      </div>
      <div className="flex justify-end mt-6">
        <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold text-white" onClick={onContinue}>Continue</button>
      </div>
    </div>
  );
}

export default Payment