import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import api from '../api/apiClient'
import '../index.css'

export default function Attendance() {
  const [students, setStudents] = useState([])
  const [date, setDate] = useState('')
  const [marked, setMarked] = useState({})
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // Saare students load karo
  useEffect(() => {
    api.get('/students').then(r => setStudents(r.data))
  }, [])

  useEffect(() => {
    if (!date) return;

    api.get('/attendance', { params: { date } })
      .then(res => {
        const map = {};
        res.data.forEach(a => {
          map[a.student._id || a.student] = a.status;
        });
        setMarked(map);
        setEditMode(res.data.length > 0);   // ✅ agar data mila → edit mode ON
      })
      .catch(() => {
        setMarked({});
        setEditMode(false);
      });
  }, [date]);

  // Local state me Present/Absent mark
  const mark = (id, status) => {
    setMarked(prev => ({ ...prev, [id]: status }))
  }

  // Save attendance for all marked students
  const saveAll = async () => {
    if (!date) return alert("Pehle date select karo")
    if (Object.keys(marked).length === 0) return alert("Kisi ek student ko to mark karo")

    setLoading(true)
    try {
      for (const id of Object.keys(marked)) {
        if (editMode) {
          // ✅ UPDATE
          await api.put('/attendance', {
            student: id,
            date,
            status: marked[id]
          })
        } else {
          // ✅ CREATE (new)
          await api.post('/attendance', {
            student: id,
            date,
            status: marked[id]
          })
        }
      }

      alert(editMode ? "Attendance updated ✅" : "Attendance saved ✅")
      setMarked({})

    } catch (e) {
      if (e.response?.status === 400) {
        alert("⚠️ Attendance already exists for this date")
      } else {
        alert("Error saving attendance ❌")
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <h1>Attendance</h1>

        {/* Date + Save button */}
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{ maxWidth: 200 }}
          />
          <button className="btn" onClick={saveAll} disabled={loading}>
            {loading ? 'Saving...' : editMode ? 'Update Attendance' : 'Save Attendance'}
          </button>

        </div>

        {/* Students list */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>
                    <button
                      onClick={() => mark(s._id, 'Present')}
                      className={`att-btn present ${marked[s._id] === 'Present' ? 'active' : ''
                        }`}
                    >
                      Present
                    </button>

                    <button
                      onClick={() => mark(s._id, 'Absent')}
                      className={`att-btn absent ${marked[s._id] === 'Absent' ? 'active' : ''
                        }`}
                    >
                      Absent
                    </button>

                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', padding: 16 }}>
                    No students found
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
