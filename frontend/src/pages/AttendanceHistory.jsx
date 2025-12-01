import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import api from '../api/apiClient'

export default function AttendanceHistory() {

  const [date, setDate] = useState('')
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)

  const loadHistory = async () => {
    if (!date) return alert("Select date");

    setLoading(true)
    try {
      const res = await api.get(`/attendance?date=${date}`)
      setRecords(res.data)
    } catch (err) {
      console.error(err)
      alert("Failed to load attendance")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />

        <h1>Attendance History</h1>

        <div className="card" style={{ display: 'flex', gap: 10 }}>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <button className="btn" onClick={loadHistory}>
            {loading ? 'Loading...' : 'Load'}
          </button>
        </div>

        <br />

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r._id}>
                  <td>{r.student.name}</td>
                  <td style={{ color: r.status === 'Present' ? '#22c55e' : '#ef4444' }}>
                    {r.status}
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center' }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
