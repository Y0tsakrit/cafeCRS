import React, { useState, useEffect } from 'react'
import Subnavstaff from './subcomponent/subnavstaff'
import { MdDelete, MdEdit, MdClose, MdCheck } from 'react-icons/md'

const BASE = 'http://localhost:8000'

function Editmenu() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ name: '', price: '' })
  const [editForm, setEditForm] = useState({ name: '', price: '' })
  const [saving, setSaving] = useState(false)
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const fetchMenus = async () => {
    try {
      const res = await fetch(`${BASE}/api/menus/`)
      const data = await res.json()
      // API returns a map; convert to sorted array
      const arr = Object.values(data).sort((a, b) => a.id - b.id)
      setMenus(arr)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMenus() }, [])

  const handleAdd = async () => {
    if (!form.name.trim() || !form.price) return
    setSaving(true)
    try {
      const res = await fetch(`${BASE}/api/menus/add`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: form.name.trim(), price: Number(form.price) }),
      })
      if (res.ok) {
        setForm({ name: '', price: '' })
        setShowAdd(false)
        await fetchMenus()
      }
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (menu) => {
    setEditId(menu.id)
    setEditForm({ name: menu.name, price: String(menu.price) })
  }

  const handleUpdate = async (id) => {
    setSaving(true)
    try {
      const res = await fetch(`${BASE}/api/menus/update`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ id, name: editForm.name.trim(), price: Number(editForm.price) }),
      })
      if (res.ok) {
        setEditId(null)
        await fetchMenus()
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return
    try {
      const res = await fetch(`${BASE}/api/menus/delete`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ id }),
      })
      if (res.ok) await fetchMenus()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='flex md:flex-row flex-col bg-white min-h-screen'>
      <Subnavstaff />
      <div className='flex-1 p-4 md:p-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='font-bold text-2xl'>Meals</h1>
          <button
            onClick={() => { setShowAdd(true); setEditId(null) }}
            className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold text-white text-sm transition'
          >
            Add Menu
          </button>
        </div>

        {/* Add form */}
        {showAdd && (
          <div className='flex flex-wrap items-center gap-3 bg-green-50 mb-4 px-4 py-3 border border-green-200 rounded-xl'>
            <div className='bg-gray-200 rounded-lg w-12 h-12 shrink-0' />
            <input
              className='flex-1 px-3 py-2 border border-gray-300 focus:border-green-400 rounded-lg outline-none min-w-0 text-sm'
              placeholder='Menu name'
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            <input
              className='px-3 py-2 border border-gray-300 focus:border-green-400 rounded-lg outline-none w-28 text-sm'
              placeholder='Price (THB)'
              type='number'
              min='0'
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            />
            <button
              onClick={handleAdd}
              disabled={saving}
              className='text-green-600 hover:text-green-800 transition'
              title='Save'
            >
              <MdCheck size={22} />
            </button>
            <button
              onClick={() => { setShowAdd(false); setForm({ name: '', price: '' }) }}
              className='text-gray-400 hover:text-gray-600 transition'
              title='Cancel'
            >
              <MdClose size={22} />
            </button>
          </div>
        )}

        {/* Menu list */}
        {loading ? (
          <p className='text-gray-400 text-sm'>Loading…</p>
        ) : menus.length === 0 ? (
          <p className='text-gray-400 text-sm'>No menu items found.</p>
        ) : (
          <div className='space-y-2'>
            {menus.map(menu => (
              <div key={menu.id} className='flex items-center gap-4 hover:bg-gray-50 px-4 py-3 border border-gray-100 rounded-xl transition'>
                <div className='bg-gray-200 rounded-lg w-12 h-12 shrink-0' />
                {editId === menu.id ? (
                  <>
                    <input
                      className='flex-1 px-3 py-1.5 border border-gray-300 focus:border-purple-400 rounded-lg outline-none text-sm'
                      value={editForm.name}
                      onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                    />
                    <input
                      className='px-3 py-1.5 border border-gray-300 focus:border-purple-400 rounded-lg outline-none w-28 text-sm'
                      value={editForm.price}
                      type='number'
                      min='0'
                      onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
                    />
                    <button
                      onClick={() => handleUpdate(menu.id)}
                      disabled={saving}
                      className='text-green-600 hover:text-green-800 transition'
                      title='Save'
                    >
                      <MdCheck size={20} />
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className='text-gray-400 hover:text-gray-600 transition'
                      title='Cancel'
                    >
                      <MdClose size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <span className='flex-1 font-medium text-gray-800'>{menu.name}</span>
                    <span className='w-24 text-gray-500 text-sm text-right'>{menu.price} THB</span>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className='text-red-400 hover:text-red-600 transition'
                      title='Delete'
                    >
                      <MdDelete size={20} />
                    </button>
                    <button
                      onClick={() => startEdit(menu)}
                      className='text-purple-400 hover:text-purple-600 transition'
                      title='Edit'
                    >
                      <MdEdit size={20} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Editmenu