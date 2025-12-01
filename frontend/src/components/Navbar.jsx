// import '../index.css'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Navbar() {
//   const navigate = useNavigate()
//   const user = JSON.parse(localStorage.getItem('user') || '{}')
//   const role = user?.role || 'admin'

//   return (
//     <div className="navbar">
//       <h2>🎓 StudentMS</h2>

//       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//         {/* ✅ Role badge */}
//         <span style={{
//           fontSize: '12px',
//           padding: '4px 10px',
//           borderRadius: '999px',
//           background: 'rgba(37,99,235,0.2)',
//           border: '1px solid rgba(59,130,246,0.6)',
//           color: '#bfdbfe'
//         }}>
//           {role.toUpperCase()}
//         </span>

//         <Link to="/" className="btn" style={{ marginRight: '6px' }}>Dashboard</Link>
//         <Link to="/students" className="btn" style={{ marginRight: '6px' }}>Students</Link>

//         <button onClick={() => {
//           localStorage.clear()
//           navigate('/login')
//         }}>
//           Logout
//         </button>
//       </div>
//     </div>
//   )
// }



import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <>
      <nav className="navbar">
        <div className="logo">🎓 StudentMS</div>

        {/* Desktop menu */}
        <div className="nav-links desktop">
          <Link to="/">Dashboard</Link>
          <Link to="/students">Students</Link>
          <Link to="/attendance">Attendance</Link>

          {user.role === 'admin' && (
            <Link to="/users">Users</Link>
          )}

          {/* ✅ ROLE BADGE (Next to logout) */}
          {user.role && (
            <span className={`role-badge ${user.role}`}>
              {user.role.toUpperCase()}
            </span>
          )}

          <button onClick={() => {
            localStorage.clear()
            window.location.href = "/login"
          }}>
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          ☰
        </div>
      </nav>

      {/* ✅ Mobile menu */}
      <div className={`mobile-menu ${open ? 'show' : ''}`}>
        <div className="mobile-header">
          <span className="app-name">🎓 StudentMS</span>

          <span className={`role-badge ${user.role}`}>
            {user.role?.toUpperCase()}
          </span>
        </div>
        <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

        <Link onClick={() => setOpen(false)} to="/">Dashboard</Link>
        <Link onClick={() => setOpen(false)} to="/students">Students</Link>
        <Link onClick={() => setOpen(false)} to="/attendance">Attendance</Link>

        {user.role === 'admin' && (
          <Link onClick={() => setOpen(false)} to="/users">Manage Users</Link>
        )}

        <button className="logout-btn" onClick={() => {
          localStorage.clear()
          window.location.href = "/login"
        }}>
          Logout
        </button>

      </div>
    </>
  )
}
