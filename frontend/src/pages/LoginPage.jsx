import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/apiClient'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.logo}>🎓 StudentMS</h1>
        <p style={styles.tag}>Admin Control Panel</p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            type={show ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShow(!show)} style={styles.eye}>
            {show ? '🙈' : '👁️'}
          </span>
        </div>

        <button style={styles.btn}>Login</button>
        <p style={{ textAlign: 'center', marginTop: 10 }}>
          <Link to="/forgot">Forgot Password?</Link>
        </p>

        <p style={{ textAlign: 'center', marginTop: 10 }}>
          New user? <Link to="/register">Create Account</Link>
        </p>
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
    width: '400px',
    height: '400px',
    background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
    filter: 'blur(150px)',
    opacity: 0.5,
    animation: 'pulse 3s infinite alternate'
  },
  card: {
    zIndex: 1,
    backdropFilter: 'blur(10px)',
    background: 'rgba(3,7,18,0.8)',
    padding: '40px',
    width: '380px',
    borderRadius: '16px',
    boxShadow: '0 0 40px rgba(99,102,241,0.4)',
    color: 'white',
    textAlign: 'center',
    margin: '0 auto'
  },
  logo: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '5px',
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
    marginTop: '8px',
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  foot: {
    marginTop: '18px',
    fontSize: '11px',
    color: '#64748b'
  },
  error: {
    background: '#7f1d1d',
    color: '#fecaca',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '12px',
    marginBottom: '10px'
  }
}
