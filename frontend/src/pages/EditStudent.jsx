import Navbar from '../components/Navbar'
import api from '../api/apiClient'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../index.css'

export default function EditStudent() {
  const { id } = useParams()
  const nav = useNavigate()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`)
        const s = res.data

        setForm({
          name: s.name || '',
          email: s.email || '',
          phone: s.phone || '',
          course: s.course || '',
          semester: s.semester || '',
          dob: s.dob ? s.dob.substring(0, 10) : '',
          address: s.address || ''
        })

        setLoading(false)
      } catch (err) {
        alert("Error loading student")
        console.error(err)
      }
    }

    loadStudent()
  }, [id])

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await api.put(`/students/${id}`, form)
      alert("Student updated successfully ✅")
      nav('/students')
    } catch (err) {
      alert("Error updating student ❌")
      console.error(err)
    }
  }

  if (loading) return <p style={{padding:'20px'}}>Loading...</p>

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">

          <h1>Edit Student</h1>

          {/* ✅ FORM */}
          <form onSubmit={handleSubmit}>

            {
              ['name','email','phone','course','semester','dob','address'].map(f => (
                <div key={f} style={{ marginBottom:'10px' }}>
                  <label>{f.toUpperCase()}</label>
                  <input
                    name={f}
                    value={form[f]}
                    onChange={handleChange}
                    type={f === 'dob' ? 'date' : 'text'}
                    required={['name','email','course','semester'].includes(f)}
                  />
                </div>
              ))
            }

            <button type="submit" className="btn">
              Update Student
            </button>

          </form>

        </div>
      </div>
    </>
  )
}
