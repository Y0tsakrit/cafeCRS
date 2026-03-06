import { useState } from "react";


function ShowTerm({ show, onClose, onAgree }) {
  const [checked, setChecked] = useState(false);
  if (!show) return null;
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
      <div className="relative flex flex-col items-center bg-white shadow-lg p-8 rounded-xl max-w-full">
        <button
          className="top-3 right-3 absolute font-bold text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >×</button>
        <h2 className="mb-6 w-full font-bold text-black text-2xl text-left">Terms & Conditions</h2>
        <div className="mb-6 w-full text-gray-800 text-sm text-left">
          <div className="mb-4">
            <span className="font-bold">Cancellation & Refund Policy</span>
            <ul className="ml-6 list-disc">
              <li>Members are eligible for a full refund only if the booking is canceled at least 30 minutes before the scheduled start time.</li>
              <li>Cancellations made less than 30 minutes before the start time are non-refundable.</li>
              <li>No-shows are treated as late cancellations and are not eligible for a refund.</li>
              <li>All cancellations must be completed through the booking system.</li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-bold">Time Usage & Extensions</span>
            <ul className="ml-6 list-disc">
              <li>Seats and private rooms may be used only for the duration of the reserved time.</li>
              <li>Extensions are subject to availability and must be made through the booking system.</li>
              <li>Late arrivals do not extend the booking time.</li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-bold">Use of Equipment</span>
            <ul className="ml-6 list-disc">
              <li>Users are responsible for using all equipment properly and with care.</li>
              <li>Any damage caused during a booking may result in additional charges.</li>
              <li>Food and drinks are allowed but must be handled carefully to avoid damage to equipment.</li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-bold">Conduct & Behavior</span>
            <ul className="ml-6 list-disc">
              <li>All users must behave respectfully toward staff and other guests.</li>
              <li>Excessive noise, disruptive behavior, or misuse of equipment is not permitted.</li>
              <li>Management reserves the right to terminate a booking without refund if these rules are violated.</li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-bold">Availability & Changes</span>
            <ul className="ml-6 list-disc">
              <li>Seat and room availability is subject to change.</li>
              <li>We reserve the right to update or modify these terms and conditions at any time. Any changes will be published on our website.</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center mb-6 w-full">
          <input
            type="checkbox"
            id="agree"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="mr-2 w-5 h-5"
          />
          <label htmlFor="agree" className="text-sm">
            <span className="font-bold text-red-500">*</span> I have read and agree to the Seat Reservation Terms & Conditions.
          </label>
        </div>
        <div className="flex justify-end w-full">
          <button
            className={`bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded-lg transition ${!checked ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!checked}
            onClick={() => { if (checked) onAgree && onAgree(); }}
          >Continue</button>
        </div>
      </div>
    </div>
  );
}

export default ShowTerm;