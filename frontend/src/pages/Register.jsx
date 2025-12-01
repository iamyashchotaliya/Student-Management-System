import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/apiClient'

export default function Register() {

const navigate = useNavigate()
const [show, setShow] = useState(false)
const [error, setError] = useState("")

const [form, setForm] = useState({
  name: '',
  email: '',
  password: '',
  role: 'teacher'
})

const handleChange = e =>
  setForm({ ...form, [e.target.name]: e.target.value })

const submit = async (e) => {
  e.preventDefault()
  setError("")

  try {
    await api.post('/auth/register', form)
    alert("Account created ✅")
    navigate('/login')
  } catch (err) {
    setError(err.response?.data?.message || "Register failed")
  }
}

return (
<div style={styles.page}>

 <div style={styles.glow}></div>

 <form style={styles.card} onSubmit={submit}>

  <div style={styles.logo}>🎓 StudentMS</div>
  <div style={styles.tag}>Create New Account</div>

  {error && <div style={styles.error}>{error}</div>}

  <div style={styles.inputGroup}>
    <input
      style={styles.input}
      name="name"
      placeholder="Full Name"
      required
      onChange={handleChange}
    />
  </div>

  <div style={styles.inputGroup}>
    <input
      style={styles.input}
      name="email"
      placeholder="Email Address"
      required
      onChange={handleChange}
    />
  </div>

  <div style={styles.inputGroup}>
    <input
      style={styles.input}
      type={show ? "text" : "password"}
      name="password"
      placeholder="Password"
      required
      onChange={handleChange}
    />
    <span style={styles.eye} onClick={()=>setShow(!show)}>👁</span>
  </div>

  <input type="hidden" name="role" value="teacher" />

  <button style={styles.btn}>Register</button>

  <div style={styles.foot}>
    Already have account? <Link to="/login" style={{color:'#818cf8'}}>Login</Link>
  </div>

 </form>
</div>
)
}

const styles = {
  page: {
    height: '100vh',
    width: '100vw',
    background: 'radial-gradient(circle at center, #020617, #000)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  glow: {
    position: 'absolute',
    width: '420px',
    height: '420px',
    background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
    filter: 'blur(160px)',
    opacity: 0.5,
    animation: 'pulse 3s infinite alternate'
  },
  card: {
    zIndex: 1,
    backdropFilter: 'blur(10px)',
    background: 'rgba(3,7,18,0.85)',
    padding: '42px',
    width: '380px',
    borderRadius: '16px',
    boxShadow: '0 0 40px rgba(99,102,241,.45)',
    color: 'white',
    textAlign: 'center'
  },
  logo: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '6px',
    background: 'linear-gradient(to right, #818cf8, #38bdf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  tag: {
    fontSize: '12px',
    letterSpacing: '1px',
    marginBottom: '24px',
    color: '#94a3b8'
  },
  inputGroup: {
    marginBottom: '15px',
    position: 'relative'
  },
  input: {
    width: '100%',
    padding: '11px',
    borderRadius: '8px',
    border: '1px solid #1e293b',
    background: '#020617',
    color: 'white',
    outline: 'none'
  },
  eye: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer'
  },
  btn: {
    marginTop: '10px',
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  error: {
    background: '#7f1d1d',
    color: '#fecaca',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '12px',
    marginBottom: '12px'
  },
  foot: {
    marginTop: '16px',
    fontSize: '12px',
    color: '#64748b'
  }
}