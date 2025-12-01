import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import api from '../api/apiClient'
import '../index.css'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ role: 'teacher' })

  const load = () => api.get('/users').then(r => setUsers(r.data))

  useEffect(() => { load() }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const createUser = async () => {
    try {
      await api.post('/users', form)
      alert("User created ✅")
      setForm({ role: 'teacher' })
      load()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed')
    }
  }

  const deleteUser = async id => {
    if (!confirm("Delete user?")) return
    await api.delete(`/users/${id}`)
    load()
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <h1>User Management</h1>

        {/* Add User */}
        <div className="card">
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} />

          <select name="role" onChange={handleChange} value={form.role}>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>

          <br /><br />
          <button className="btn" onClick={createUser}>Create User</button>
        </div>

        {/* User Table */}
        <div className="table-container" style={{ marginTop: 20 }}>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="btn" onClick={() => deleteUser(u._id)}>
                      Delete
                    </button>
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
