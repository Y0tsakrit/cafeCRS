import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashbord from '../subcomponents/dashbord'

const AMOUNTS = [
  { amount: 150, label: 'Minimum' },
  { amount: 300 },
  { amount: 750 },
  { amount: 1500 },
  { amount: 3000 },
];

function Topup() {
  const navigate = useNavigate();
  const [qrCharge, setQrCharge] = useState(null); // full charge response
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const pollRef = useRef(null);

  const stopPolling = () => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  };

  useEffect(() => () => stopPolling(), []);

  const handleTopUp = (amountTHB) => {
    setLoading(true);
    setStatusMsg('');
    fetch('http://localhost:8000/api/payments/promptpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ amount: amountTHB * 100 }), // satang
    })
      .then(r => r.json())
      .then(charge => {
        setQrCharge(charge);
        setLoading(false);
        startPolling(charge.id);
      })
      .catch(() => { setLoading(false); alert('Failed to create payment. Please try again.'); });
  };

  const startPolling = (chargeId) => {
    stopPolling();
    pollRef.current = setInterval(() => {
      fetch(`http://localhost:8000/api/payments/status/${chargeId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      })
        .then(r => r.json())
        .then(({ status }) => {
          if (status === 'successful') {
            stopPolling();
            setStatusMsg('Payment successful! Redirecting...');
            setTimeout(() => navigate('/mainpage'), 1500);
          } else if (status === 'failed') {
            stopPolling();
            setStatusMsg('Payment failed. Please try again.');
          }
        })
        .catch(() => {});
    }, 3000);
  };

  const handleCancel = () => {
    stopPolling();
    setQrCharge(null);
    setStatusMsg('');
  };

  if (qrCharge) {
    const qrUrl = qrCharge.source?.scannable_code?.image?.download_uri;
    const amountTHB = (qrCharge.amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2 });
    return (
      <div className='flex flex-col gap-4 bg-white h-screen'>
        <Dashbord className='items-center' />
        <div className='flex flex-col items-center gap-6 mt-8'>
          <div className='font-bold text-[#8337D9] text-2xl'>Scan to Pay</div>
          <div className='text-gray-500'>Amount: <span className='font-bold text-black'>฿{amountTHB}</span></div>
          {qrUrl ? (
            <img src={qrUrl} alt='PromptPay QR' className='shadow border border-gray-200 rounded-xl w-64 h-64' />
          ) : (
            <div className='flex justify-center items-center bg-gray-100 rounded-xl w-64 h-64 text-gray-400'>QR unavailable</div>
          )}
          {statusMsg ? (
            <div className={`font-semibold text-lg ${statusMsg.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>{statusMsg}</div>
          ) : (
            <div className='text-gray-400 text-sm animate-pulse'>Waiting for payment...</div>
          )}
          <button onClick={handleCancel} className='text-gray-400 hover:text-gray-600 text-sm underline'>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 bg-white h-screen'>
      <Dashbord className='items-center' />
      <div className='flex flex-col gap-4 px-2 md:px-4 w-full md:w-[90%]'>
        <div className='flex flex-col gap-4 w-full'>
          {AMOUNTS.map(item => (
            <div key={item.amount} className='flex flex-row justify-between items-center bg-linear-to-r from-purple-700 to-purple-600 shadow p-4 rounded-md'>
              <div>
                <div className='font-bold text-white text-lg'>TopUp ฿{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                {item.label && <div className='mt-1 text-gray-300 text-xs'>{item.label}</div>}
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div className='bg-black px-4 py-2 rounded font-mono text-md text-white'>฿{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                <button
                  disabled={loading}
                  onClick={() => handleTopUp(item.amount)}
                  className='bg-lime-600 hover:bg-lime-700 disabled:opacity-50 px-4 py-2 rounded font-bold text-white transition'
                >
                  {loading ? '...' : 'TopUp'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Topup