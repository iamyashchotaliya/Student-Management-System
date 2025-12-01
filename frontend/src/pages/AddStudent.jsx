import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/apiClient'
import '../index.css'

export default function AddStudent() {
  const [form, setForm] = useState({})
  const nav = useNavigate()

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await api.post('/students', form)
      alert("Student saved successfully ✅")
      nav('/students')
    } catch (err) {
      alert("Error saving student ❌")
      console.error(err)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
        
          <button
            className="btn"
            style={{ marginBottom: '10px' }}
            onClick={() => nav('/')}
          >
            ← Back to Dashboard
          </button>


          <h1>Add Student</h1>

          {/* ✅ FORM START */}
          <form onSubmit={handleSubmit}>

            {
              ['name', 'email', 'phone', 'course', 'semester', 'dob', 'address'].map(f => (
                <div key={f} style={{ marginBottom: '10px' }}>
                  <label>{f.toUpperCase()}</label>
                  <input
                    name={f}
                    required={['name', 'email', 'course', 'semester'].includes(f)}
                    onChange={handleChange}
                    type={f === 'dob' ? 'date' : 'text'}
                  />
                </div>
              ))
            }

            {/* ✅ SUBMIT BUTTON */}
            <button type="submit" className="btn">
              Save Student
            </button>

          </form>
          {/* ✅ FORM END */}

        </div>
      </div>
    </>
  )
}
