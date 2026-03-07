import React, { useState, useEffect } from 'react'
import Subnavstaff from './subcomponent/subnavstaff'

const STATUSES = ['pending', 'preparing', 'ready', 'delivered']

const STATUS_BADGE = {
  pending:   'bg-yellow-100 text-yellow-700 border border-yellow-300',
  preparing: 'bg-blue-100 text-blue-700 border border-blue-300',
  ready:     'bg-green-100 text-green-700 border border-green-300',
  delivered: 'bg-gray-100 text-gray-500 border border-gray-300',
}

const STATUS_CARD = {
  pending:   'bg-yellow-50 border-yellow-200',
  preparing: 'bg-blue-50 border-blue-200',
  ready:     'bg-green-50 border-green-200',
  delivered: 'bg-gray-50 border-gray-200',
}

function Viewstatus() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [filterStatus, setFilterStatus] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)

  const token = localStorage.getItem('token')

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/orders/order/all', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) {
        const err = await res.text()
        console.error('Failed to fetch orders:', res.status, err)
        setLoading(false)
        return
      }
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Fetch error:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch('http://localhost:8000/api/orders/order/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId: Number(orderId), status: newStatus }),
      })
      if (!res.ok) {
        const err = await res.text()
        console.error('Status update failed:', res.status, err)
        return
      }
      setOrders(prev =>
        prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o)
      )
      if (selectedOrder?.orderId === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const nextStatus = (current) => {
    const idx = STATUSES.indexOf(current?.toLowerCase())
    return idx >= 0 && idx < STATUSES.length - 1 ? STATUSES[idx + 1] : null
  }

  const countByStatus = STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter(o => o.status?.toLowerCase() === s).length
    return acc
  }, {})

  const itemCountByStatus = STATUSES.reduce((acc, s) => {
    acc[s] = orders
      .filter(o => o.status?.toLowerCase() === s)
      .reduce((sum, o) => sum + (o.items || []).reduce((a, i) => a + i.quantity, 0), 0)
    return acc
  }, {})

  let displayed = filterStatus
    ? orders.filter(o => o.status?.toLowerCase() === filterStatus)
    : [...orders]
  displayed.sort((a, b) => {
    const ai = STATUSES.indexOf(a.status?.toLowerCase())
    const bi = STATUSES.indexOf(b.status?.toLowerCase())
    return sortAsc ? ai - bi : bi - ai
  })

  const formatTime = (ts) => ts ? new Date(ts).toLocaleTimeString() : '-'

  const badgeClass = (status) => STATUS_BADGE[status?.toLowerCase()] || 'bg-gray-100 text-gray-500'

  return (
    <div className='flex md:flex-row flex-col bg-white min-h-screen'>
      <Subnavstaff />
      <div className='flex-1 p-4 md:p-8'>
        {selectedOrder ? (
          // ── Detail View ──────────────────────────────────────
          <div>
            <p className='mb-4 text-gray-400 text-sm'>
              View Status &gt; <span className='text-purple-600'>View Detail</span>
            </p>
            <div className='bg-white p-6 border border-gray-200 rounded-xl max-w-2xl'>
              <button
                onClick={() => setSelectedOrder(null)}
                className='flex items-center gap-1 mb-5 font-medium text-gray-600 hover:text-purple-600 text-sm'
              >
                ← Order Detail
              </button>

              <div className='flex flex-wrap items-center gap-3 mb-4'>
                <h2 className='font-bold text-lg'>
                  Order #{String(selectedOrder.orderId).padStart(9, '0')}
                </h2>
                <span className='text-gray-500 text-sm'>Seat: {selectedOrder.seatName}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${badgeClass(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Status buttons */}
              <div className='flex flex-wrap gap-2 mb-6'>
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selectedOrder.orderId, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition
                      ${selectedOrder.status?.toLowerCase() === s
                        ? `${STATUS_BADGE[s]} cursor-default`
                        : 'border-gray-200 text-gray-500 hover:border-purple-400 hover:text-purple-600'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className='mb-2 font-semibold text-gray-600 text-sm'>Item</p>
              <div className='space-y-2'>
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className='flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg'>
                    <span className='w-6 text-gray-400 text-sm'>{idx + 1}</span>
                    <span className='flex-1 font-medium text-sm'>{item.menuName}</span>
                    <span className='text-gray-500 text-sm'>×{item.quantity}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${badgeClass(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // ── List View ─────────────────────────────────────────
          <div>
            <h1 className='mb-6 font-bold text-2xl'>Kitchen Dashboard</h1>

            {/* Order Count */}
            <div className='mb-4'>
              <p className='mb-2 font-semibold text-gray-500 text-sm'>Order Count</p>
              <div className='gap-3 grid grid-cols-2 sm:grid-cols-4'>
                {STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(filterStatus === s ? null : s)}
                    className={`border rounded-lg p-3 text-center transition
                      ${filterStatus === s ? 'ring-2 ring-purple-400' : ''}
                      ${STATUS_CARD[s]}`}
                  >
                    <div className='font-bold text-2xl'>{countByStatus[s]}</div>
                    <div className='mt-1 text-gray-600 text-xs capitalize'>{s}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Item Count */}
            <div className='mb-6'>
              <p className='mb-2 font-semibold text-gray-500 text-sm'>Item Count</p>
              <div className='gap-3 grid grid-cols-2 sm:grid-cols-4'>
                {STATUSES.map(s => (
                  <div key={s} className={`border rounded-lg p-3 text-center ${STATUS_CARD[s]}`}>
                    <div className='font-bold text-2xl'>{itemCountByStatus[s]}</div>
                    <div className='mt-1 text-gray-600 text-xs capitalize'>{s}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className='bg-white border border-gray-200 rounded-xl overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='bg-gray-50 border-gray-200 border-b'>
                    <th className='px-4 py-3 font-semibold text-gray-600 text-left'>Order Number</th>
                    <th className='px-4 py-3 font-semibold text-gray-600 text-center'>Quantity</th>
                    <th className='px-4 py-3 font-semibold text-gray-600 text-center'>
                      <button
                        onClick={() => setSortAsc(!sortAsc)}
                        className='flex items-center gap-1 mx-auto font-semibold hover:text-purple-600'
                      >
                        Status {sortAsc ? '↑' : '↓'}
                      </button>
                    </th>
                    <th className='px-4 py-3 font-semibold text-gray-600 text-center'>Timestamp</th>
                    <th className='px-4 py-3 font-semibold text-gray-600 text-center'></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className='py-8 text-gray-400 text-center'>Loading…</td>
                    </tr>
                  ) : displayed.length === 0 ? (
                    <tr>
                      <td colSpan={5} className='py-8 text-gray-400 text-center'>No orders found</td>
                    </tr>
                  ) : displayed.map(order => {
                    const totalQty = (order.items || []).reduce((s, i) => s + i.quantity, 0)
                    const next = nextStatus(order.status)
                    return (
                      <tr key={order.orderId} className='hover:bg-gray-50 border-gray-100 border-b'>
                        <td className='px-4 py-3 font-mono text-gray-700'>
                          #{String(order.orderId).padStart(9, '0')}
                        </td>
                        <td className='px-4 py-3 text-center'>{totalQty}</td>
                        <td className='px-4 py-3 text-center'>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${badgeClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className='px-4 py-3 text-gray-500 text-center'>{formatTime(order.createdAt)}</td>
                        <td className='px-4 py-3 text-center'>
                          <div className='flex justify-center items-center gap-2'>
                            {next && (
                              <button
                                onClick={() => updateStatus(order.orderId, next)}
                                className='bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg font-medium text-white text-xs capitalize transition'
                              >
                                Set {next}
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className='text-purple-600 text-xs hover:underline'
                            >
                              View Detail
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Viewstatus