import React, { useState, useEffect } from 'react'
import Subnavstaff from './subcomponent/subnavstaff'
import { MdSearch, MdFilterList, MdSort } from 'react-icons/md'

const BASE = 'http://localhost:8000'
const CATEGORIES = ['All', 'Customer', 'Staff', 'Admin']

const ROLE_MAP = {
  USER: 'Customer',
  STAFF: 'Staff',
  ADMIN: 'Admin',
}

const ROLE_OPTIONS = [
  { label: 'Customer', value: 'USER' },
  { label: 'Staff',    value: 'STAFF' },
  { label: 'Admin',    value: 'ADMIN' },
]

function Manageacc() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [updatingId, setUpdatingId] = useState(null)
  const token = localStorage.getItem('token')

  // Decode caller's role from JWT
  let callerRole = 'USER'
  try { callerRole = JSON.parse(atob(token.split('.')[1])).role?.toUpperCase() || 'USER' } catch {}
  const isAdmin = callerRole === 'ADMIN'

  const fetchUsers = () => {
    fetch(`${BASE}/api/users/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : [])
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchUsers() }, [])

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId)
    try {
      const res = await fetch(`${BASE}/api/users/role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: userId, role: newRole }),
      })
      if (res.ok) {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      }
    } finally {
      setUpdatingId(null)
    }
  }

  const displayed = users.filter(u => {
    const matchCat =
      category === 'All' ||
      (category === 'Customer' && u.role?.toUpperCase() === 'USER') ||
      (category === 'Staff'    && u.role?.toUpperCase() === 'STAFF') ||
      (category === 'Admin'    && u.role?.toUpperCase() === 'ADMIN')
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      String(u.id).includes(q) ||
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  return (
    <div className='flex md:flex-row flex-col bg-white min-h-screen'>
      <Subnavstaff />
      <div className='flex-1 p-4 md:p-8'>
        <h1 className='mb-6 font-bold text-2xl'>Manage Accounts</h1>

        {/* Search bar */}
        <div className='flex items-center gap-3 mb-4'>
          <div className='flex flex-1 items-center gap-2 bg-white shadow-sm px-4 py-2 border border-gray-300 rounded-xl max-w-md'>
            <MdSearch size={18} className='text-gray-400' />
            <input
              className='flex-1 outline-none text-sm placeholder-gray-400'
              placeholder='Search by id, name or email…'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <MdFilterList size={22} className='text-gray-400 hover:text-gray-600 cursor-pointer' />
          <MdSort size={22} className='text-gray-400 hover:text-gray-600 cursor-pointer' />
        </div>

        {/* Category tabs */}
        <div className='flex items-center gap-1 mb-5'>
          <span className='mr-3 font-semibold text-gray-600 text-sm'>Category</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition
                ${category === cat
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400 hover:text-purple-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className='border border-gray-200 rounded-xl overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-gray-100 border-gray-200 border-b'>
                <th className='px-4 py-3 font-semibold text-gray-600 text-left'>id</th>
                <th className='px-4 py-3 font-semibold text-gray-600 text-left'>name</th>
                <th className='px-4 py-3 font-semibold text-gray-600 text-left'>email</th>
                <th className='px-4 py-3 font-semibold text-gray-600 text-left'>credit</th>
                <th className='px-4 py-3 font-semibold text-gray-600 text-left'>role</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className='py-10 text-gray-400 text-center'>Loading…</td>
                </tr>
              ) : displayed.length === 0 ? (
                <tr>
                  <td colSpan={5} className='py-10 text-gray-400 text-center'>No accounts found</td>
                </tr>
              ) : displayed.map((u, i) => (
                <tr key={u.id} className={`border-b border-gray-100 ${i % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className='px-4 py-3 text-gray-500'>{u.id}</td>
                  <td className='px-4 py-3 font-medium text-gray-800'>{u.name || '—'}</td>
                  <td className='px-4 py-3 text-gray-600'>{u.email}</td>
                  <td className='px-4 py-3 text-gray-600'>{Number(u.credit ?? 0).toFixed(2)}</td>
                  <td className='px-4 py-3'>
                    {isAdmin ? (
                      <select
                        value={u.role?.toUpperCase() || 'USER'}
                        disabled={updatingId === u.id}
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-xs font-medium border outline-none cursor-pointer transition
                          ${u.role?.toUpperCase() === 'ADMIN' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                            u.role?.toUpperCase() === 'STAFF' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                            'bg-gray-100 text-gray-600 border-gray-300'}`}
                      >
                        {ROLE_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${u.role?.toUpperCase() === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                          u.role?.toUpperCase() === 'STAFF' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'}`}>
                        {ROLE_MAP[u.role?.toUpperCase()] || u.role || 'User'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Manageacc