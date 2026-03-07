import React, { useState, useEffect } from 'react'
function Order() {

    const [menus, setMenus] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [selectedSeatId, setSelectedSeatId] = useState('');
    const [cart, setCart] = useState({}); // { menuId: quantity }

    useEffect(() => {
        fetch('http://localhost:8000/api/menus/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(r => r.json())
        .then(data => setMenus(Object.values(data)))
        .catch(err => console.error('Error fetching menus:', err));

        fetch('http://localhost:8000/api/seats/book/current', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(r => r.json())
        .then(data => {
            const orders = data.orders || [];
            setBookedSeats(orders);
            if (orders.length > 0) setSelectedSeatId(orders[0].seatId);
        })
        .catch(err => console.error('Error fetching seats:', err));
    }, []);

    const changeQty = (id, delta) => {
        setCart(prev => {
            const current = prev[id] || 0;
            const next = Math.max(0, current + delta);
            if (next === 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [id]: next };
        });
    };

    const cartItems = menus.filter(m => cart[m.id] > 0);
    const total = cartItems.reduce((sum, m) => sum + m.price * cart[m.id], 0);

    const handleProcess = () => {
        if (!selectedSeatId) { alert('Please select a seat.'); return; }
        if (cartItems.length === 0) { alert('Your cart is empty.'); return; }
        const orderList = {};
        cartItems.forEach(m => { orderList[m.id] = cart[m.id]; });
        fetch('http://localhost:8000/api/orders/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({ seatId: Number(selectedSeatId), orderList })
        })
        .then(r => r.text())
        .then(text => { alert(text); setCart({}); })
        .catch(() => alert('An error occurred. Please try again.'));
    };

  return (
    <div className='bg-white p-4 md:p-10 h-full'>
        <div className='mb-6'>
            <div className='text-2xl'>Our Menu</div>
            <div>Welcome to our menu — your go-to stop for coffee, drinks, and quick bites while you work, study, or game.</div>
        </div>
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
            {/* Menu list */}
            <div className='flex flex-col gap-6 ml-4'>
                <b className='text-xl'>Menu</b>
                {menus.map(item => (
                    <div key={item.id} className='flex justify-between items-center pr-4'>
                        <div>{item.name}</div>
                        <div className='flex items-center gap-2'>
                            <span className='text-gray-500 text-sm'>{item.price} THB</span>
                            <div className='flex items-center gap-1'>
                                <button className='bg-gray-200 hover:bg-gray-300 px-2 py-0.5 rounded-lg font-bold' onClick={() => changeQty(item.id, -1)}>-</button>
                                <span className='w-5 text-center'>{cart[item.id] || 0}</span>
                                <button className='bg-gray-200 hover:bg-gray-300 px-2 py-0.5 rounded-lg font-bold' onClick={() => changeQty(item.id, 1)}>+</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart */}
            <div className='top-4 sticky flex flex-col gap-3 ml-4'>
                <b className='text-xl'>Cart</b>
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold text-sm'>Select Seat</label>
                    <select
                        className='bg-gray-100 px-2 py-1 border border-gray-400 rounded w-fit'
                        value={selectedSeatId}
                        onChange={e => setSelectedSeatId(e.target.value)}
                    >
                        {bookedSeats.length === 0
                            ? <option value=''>No active reservations</option>
                            : bookedSeats.map(s => (
                                <option key={s.id} value={s.seatId}>
                                    {s.seatName} ({new Date(s.dateStart).toLocaleString()} - {new Date(s.dateEnd).toLocaleString()})
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className='font-semibold text-[#8337D9]'>Items</div>
                {cartItems.length === 0
                    ? <div className='text-gray-400 text-sm'>No items added yet.</div>
                    : cartItems.map(m => (
                        <div key={m.id} className='flex justify-between text-sm'>
                            <span>{cart[m.id]}× {m.name}</span>
                            <span>{(m.price * cart[m.id]).toFixed(0)} THB</span>
                        </div>
                    ))
                }

                <div className='flex justify-between mt-2'>
                    <span className='font-bold text-[#8337D9] text-lg'>Total</span>
                    <span className='font-bold text-lg'>{total.toFixed(0)} THB</span>
                </div>

                <button
                    className='bg-[#05E81F] hover:bg-green-500 disabled:opacity-50 mt-2 p-2 rounded-lg w-[40%] text-white text-center'
                    disabled={cartItems.length === 0 || !selectedSeatId}
                    onClick={handleProcess}
                >Process</button>
            </div>
        </div>
    </div>
  )
}

export default Order