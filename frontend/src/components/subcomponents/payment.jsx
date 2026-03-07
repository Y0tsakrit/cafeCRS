import React from 'react'

function Payment({ onContinue, selectedDate, startTime, endTime, selectedSeats = [] }) {
  const hours = (selectedDate && startTime && endTime)
    ? Math.max(0, (new Date(`${selectedDate}T${endTime}:00`) - new Date(`${selectedDate}T${startTime}:00`)) / 3600000)
    : 0;
  const unitPrice = hours * 60;
  const totalPrice = unitPrice * selectedSeats.length;

  const dateDisplay = selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB') : '-';
  const timeDisplay = (startTime && endTime) ? `${startTime} - ${endTime}` : '-';

  return (
    <div className="bg-gray-50 mt-8 p-6 border border-gray-200 rounded-xl w-full">
      <h2 className="mb-4 font-bold text-lg">Reservation Details</h2>
      <div className="gap-x-4 gap-y-2 grid grid-cols-2 text-sm">
        <div className="font-bold text-purple-700">Date</div>
        <div>{dateDisplay}</div>
        <div className="font-bold text-purple-700">Time</div>
        <div>{timeDisplay}</div>
        <div className="font-bold text-purple-700">Seat ID</div>
        <div>{selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</div>
        <div className="font-bold text-purple-700">Quantity</div>
        <div>{selectedSeats.length}</div>
        <div className="font-bold text-purple-700">Unit Price</div>
        <div>{unitPrice > 0 ? `${unitPrice} THB` : '-'}</div>
        <div className="font-bold text-purple-700">Total Price</div>
        <div className="font-bold text-purple-700">{totalPrice > 0 ? `${totalPrice} THB` : '-'}</div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-6 py-2 rounded-lg font-bold text-white"
          onClick={onContinue}
          disabled={selectedSeats.length === 0 || hours <= 0}
        >Continue</button>
      </div>
    </div>
  );
}

export default Payment