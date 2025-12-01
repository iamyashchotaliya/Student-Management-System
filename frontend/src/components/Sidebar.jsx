import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="sidebar">
      <h2>🎓 StudentMS</h2>

      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        📊 Dashboard
      </Link>

      <Link to="/students" className={location.pathname === "/students" ? "active" : ""}>
        👥 Students
      </Link>

      <Link to="/students/add" className={location.pathname === "/students/add" ? "active" : ""}>
        ➕ Add Student
      </Link>

      <Link to="/attendance" className={location.pathname === "/attendance" ? "active" : ""}>
        📅 Attendance
      </Link>

      {JSON.parse(localStorage.getItem('user') || '{}')?.role === 'admin' && (
        <Link to="/users">👥 Manage Users</Link>
      )}

    </div>
  )
}
