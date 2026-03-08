import Payment from '../subcomponents/payment';
import ShowTerm from '../subcomponents/showterm';
import Confirm from '../subcomponents/confirm';
import React, { useState, useEffect } from 'react';
function SubReserve() {

    const [selectedDate, setSelectedDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [availableSeats, setAvailableSeats] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        if (!selectedDate || !startTime || !endTime) return;
        const startISO = `${selectedDate}T${startTime}:00`;
        const endISO = `${selectedDate}T${endTime}:00`;
        fetch('http://localhost:8000/api/seats/available', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startTime: startISO, endTime: endISO })
        })
        .then(res => res.json())
        .then(data => { setAvailableSeats(data); setSelectedSeats([]); })
        .catch(err => console.error('Error fetching available seats:', err));
    }, [selectedDate, startTime, endTime]);

    const seatRows = ['A','B','C','D','E','F'];
    const seatCols = [1,2,3,4,5,6,7,8];
    const getSeatKey = (row, col) => row + col;

    const getSeatStatus = (key) => {
        if (!selectedDate || !startTime || !endTime) return 'reserved';
        const isAvailable = Object.values(availableSeats).includes(key);
        return isAvailable ? 'available' : 'reserved';
    };
    const toggleSeat = (key) => {
        setSelectedSeats(prev =>
            prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
        );
    };
    const getSeatColor = (status, key) => {
        if (selectedSeats.includes(key)) return 'bg-purple-500 text-white border-purple-700';
        return status === 'available' ? 'bg-green-100 text-green-900 border-green-400' : 'bg-gray-200 text-gray-700 border-gray-300';
    };

    const iconFood = 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png';
    const iconRestroom = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png';
    const iconPlayground = 'https://cdn-icons-png.flaticon.com/512/3076/3076922.png';

    const [showTerm, setShowTerm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handlePaymentContinue = () => setShowTerm(true);
    const handleTermAgree = () => {
        setShowTerm(false);
        setShowConfirm(true);
    };
    const handleConfirmClose = () => setShowConfirm(false);

const handleBooking = () => {

    const token = localStorage.getItem('token');

    if (!token) {
        alert('Please sign in to reserve seats.');
        window.location.href = '/signin';
        return;
    }
        const seatIds = selectedSeats
            .map(name => parseInt(Object.keys(availableSeats).find(id => availableSeats[id] === name)))
            .filter(id => !isNaN(id));
        const dateStart = `${selectedDate}T${startTime}:00`;
        const dateEnd = `${selectedDate}T${endTime}:00`;
        fetch('http://localhost:8000/api/seats/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ seatId: seatIds, dateStart, dateEnd })
        })
        .then(res => res.text())
        .then(text => {
            setShowConfirm(false);
            if (text === 'Seat booked successfully.') {
                alert('Booking confirmed!');
                window.location.reload();
                setSelectedSeats([]);
            } else {
                alert(text);
            }
        })
        .catch(err => { console.error('Booking error:', err); alert('An error occurred. Please try again.'); });
    };

    const timeOptions = [];
    for (let h = 8; h <= 22; h++) {
        timeOptions.push(`${String(h).padStart(2, '0')}:00`);
    }

    const nowGMT7 = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
    const todayStr = nowGMT7.toLocaleDateString('en-CA');

    const now = nowGMT7;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const roundedNow = Math.ceil(currentMinutes / 15) * 15;

    const startTimeOptions = timeOptions.filter(t => {
        if (selectedDate !== todayStr) return true;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m >= roundedNow;
    });

    const endTimeOptions = timeOptions.filter(t => {
        if (!startTime) return true;
        const [sh, sm] = startTime.split(':').map(Number);
        const [eh, em] = t.split(':').map(Number);
        return eh * 60 + em > sh * 60 + sm;
    });

  return (
    <div className="flex flex-col px-2 md:px-8 w-full">
        {/* Date/Time Selectors */}
            <div className="flex justify-center items-center gap-2 bg-gray-50 mt-6 mb-4 py-4 border border-gray-200 rounded-2xl w-full">
                <div className="flex sm:flex-row flex-col flex-1 justify-center items-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center px-4">
                        <span className="font-semibold text-purple-600 text-base md:text-lg">Select Date</span>
                        <input type="date" className="mt-1 px-2 py-1 border border-gray-300 rounded-lg font-extrabold text-base md:text-xl" value={selectedDate} min={todayStr} onChange={e => { setSelectedDate(e.target.value); setStartTime(''); setEndTime(''); }} />
                    </div>
                    <div className="hidden sm:block border-gray-300 border-l h-10"/>
                    <div className="flex flex-col items-center px-4">
                        <span className="font-semibold text-purple-600 text-base md:text-lg">Start Time</span>
                        <select className="mt-1 px-2 py-1 border border-gray-300 rounded-lg font-extrabold text-base md:text-xl" value={startTime} onChange={e => { setStartTime(e.target.value); setEndTime(''); }}>
                            <option value="">--:--</option>
                            {startTimeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="border-gray-300 border-l h-10"/>
                    <div className="flex flex-col items-center px-4">
                        <span className="font-semibold text-purple-600 text-base md:text-lg">End Time</span>
                        <select className="mt-1 px-2 py-1 border border-gray-300 rounded-lg font-extrabold text-base md:text-xl" value={endTime} onChange={e => setEndTime(e.target.value)}>
                            <option value="">--:--</option>
                            {endTimeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>
            </div>

        {/* Seat Map */}
        <div className="bg-[#f7f8fa] mx-auto mt-2 p-4 md:p-8 border border-gray-200 rounded-2xl w-full overflow-x-auto">
          <div className="flex flex-row items-start gap-4 md:gap-8 mb-2 min-w-max">
            {/* Icons */}
            <div className="flex flex-col gap-8 mt-2">
              <div className="flex justify-center items-center bg-black rounded w-14 md:w-20 h-14 md:h-20">
                <img src={iconFood} alt="food" className="w-8 md:w-12 h-8 md:h-12" />
              </div>
              <div className="flex justify-center items-center bg-black rounded w-14 md:w-20 h-14 md:h-20">
                <img src={iconRestroom} alt="restroom" className="w-8 md:w-12 h-8 md:h-12" />
              </div>
              <div className="flex justify-center items-center bg-black rounded w-14 md:w-20 h-14 md:h-20">
                <img src={iconPlayground} alt="playground" className="w-8 md:w-12 h-8 md:h-12" />
              </div>
            </div>
            {/* Seat grid and privates */}
            <div className="flex flex-col w-full">
            <div className="flex justify-center gap-6 mb-4">
                <div className="flex justify-center items-center bg-gray-200 border border-gray-300 rounded w-56 h-32 font-bold text-gray-600 text-xl">
                Private 1
                </div>
                <div className="flex justify-center items-center bg-gray-200 border border-gray-300 rounded w-56 h-32 font-bold text-gray-600 text-xl">
                Private 2
                </div>
            </div>
            {/* Seat grid */}
            <div className="flex flex-col gap-4 w-full">
            {seatRows.map(row => (
                <div key={row} className="flex justify-center items-center">

                {[0,1,2,3].map(group => (
                    <div
                    key={group}
                    className={`flex gap-3 ${group !== 3 ? 'mr-16' : ''}`}
                    >
                    {seatCols.slice(group*2, group*2+2).map(col => {
                        const key = getSeatKey(row, col);
                        const status = getSeatStatus(key);

                        return (
                        <div
                            key={key}
                            className={`w-16 h-12 rounded flex font-bold border-2 text-lg
                            ${getSeatColor(status, key)}
                            ${status === 'available'
                            ? 'cursor-pointer hover:ring-2 ring-purple-400'
                            : 'cursor-not-allowed opacity-60'
                            }`}
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center'
                            }}
                            onClick={() => status === 'available' && toggleSeat(key)}
                        >
                            {key}
                        </div>
                        );
                    })}
                    </div>
                ))}

                </div>
            ))}
            </div>
          </div>
        </div>
        <Payment
          onContinue={handlePaymentContinue}
          selectedDate={selectedDate}
          startTime={startTime}
          endTime={endTime}
          selectedSeats={selectedSeats}
        />
      </div>
      <ShowTerm show={showTerm} onClose={() => setShowTerm(false)} onAgree={handleTermAgree}/>
      <Confirm show={showConfirm} onClose={handleConfirmClose} onConfirm={handleBooking}/>
    </div>
  )
}

export default SubReserve