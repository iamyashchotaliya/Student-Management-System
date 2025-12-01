import { useState } from 'react'
import api from '../api/apiClient'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {

const [email, setEmail] = useState('')
const [newPassword, setNewPassword] = useState('')
const [show, setShow] = useState(false)
const [error, setError] = useState('')
const [success, setSuccess] = useState('')

const submit = async (e) => {
  e.preventDefault()
  setError('')
  setSuccess('')

  try {
    await api.post('/auth/forgot-password', { email, newPassword })
    setSuccess('Password reset successfully ✅')
    setTimeout(()=> window.location.href='/login', 2000)
  } catch (err) {
    setError(err.response?.data?.message || 'Reset failed')
  }
}

return (
<div style={styles.page}>

 <div style={styles.glow}></div>

 <form style={styles.card} onSubmit={submit}>

  <div style={styles.logo}>🎓 StudentMS</div>
  <div style={styles.tag}>Reset Your Password</div>

  {error && <div style={styles.error}>{error}</div>}
  {success && <div style={styles.success}>{success}</div>}

  <div style={styles.inputGroup}>
    <input
      type="email"
      placeholder="Registered Email"
      value={email}
      required
      style={styles.input}
      onChange={e => setEmail(e.target.value)}
    />
  </div>

  <div style={styles.inputGroup}>
    <input
      type={show ? "text" : "password"}
      placeholder="Add New Password"
      value={newPassword}
      required
      style={styles.input}
      onChange={e => setNewPassword(e.target.value)}
    />
    <span style={styles.eye} onClick={()=>setShow(!show)}>👁</span>
  </div>

  <button style={styles.btn}>Reset Password</button>

  <div style={styles.foot}>
    Back to <Link to="/login" style={{ color:'#818cf8' }}>Login</Link>
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
    width: '430px',
    height: '430px',
    background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
    filter: 'blur(160px)',
    opacity: 0.5,
    animation: 'pulse 3s infinite alternate'
  },
  card: {
    zIndex: 1,
    backdropFilter: 'blur(10px)',
    background: 'rgba(3,7,18,0.9)',
    padding: '42px',
    width: '380px',
    borderRadius: '16px',
    boxShadow: '0 0 45px rgba(99,102,241,0.45)',
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
    marginBottom: '25px',
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
    marginBottom: '10px'
  },
  success: {
    background: '#064e3b',
    color: '#a7f3d0',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '12px',
    marginBottom: '10px'
  },
  foot: {
    marginTop: '16px',
    fontSize: '12px',
    color: '#64748b'
  }
}