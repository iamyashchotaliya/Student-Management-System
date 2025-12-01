// import Navbar from '../components/Navbar'
// import { useEffect, useState } from 'react'
// import api from '../api/apiClient'
// import { Link } from 'react-router-dom'
// import '../index.css'

// export default function Dashboard() {
//   const [total, setTotal] = useState(0)

//   useEffect(() => {
//     api.get('/students').then(res => setTotal(res.data.length))
//   }, [])

//   return (
//     <>
//       <Navbar />

//       <div className="container">

//         <h1 style={{
//           textAlign: 'center',
//           fontSize: '26px',
//           marginBottom: '20px',
//           color: '#a5b4fc'
//         }}>
//           Dashboard Overview
//         </h1>

//         <div style={{
//           display: 'flex',
//           justifyContent: 'center',
//           gap: '30px',
//           marginTop: '30px'
//         }}>

//           <div className="card" style={{ width: '260px', textAlign: 'center' }}>
//             <h3>Total Students</h3>
//             <p style={{ fontSize: '34px' }}>{total}</p>
//             <Link to="/students" className="btn">View Students</Link>
//           </div>

//           <div className="card" style={{ width: '260px', textAlign: 'center' }}>
//             <h3>Add Student</h3>
//             <p style={{ fontSize: '13px', opacity: .7 }}>
//               Register new student
//             </p>
//             <Link to="/students/add" className="btn">Add Student</Link>
//           </div>

//         </div>

//       </div>
//     </>
//   )
// }




import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useEffect, useState } from 'react'
import api from '../api/apiClient'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    loadTotal()
  }, [])

  const loadTotal = async () => {
    try {
      const res = await api.get('/students')

      const list = Array.isArray(res.data)
        ? res.data
        : res.data.students || res.data.data || []

      setTotal(list.length)

    } catch (err) {
      console.error("Failed to load total students", err)
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <h1>Dashboard Overview</h1>

        <div className="stats-grid">

          <div className="card stat-card">
            <h3>Total Students</h3>
            <div className="stat-number">{total}</div>   {/* ✅ LIVE */}
          </div>

          <div className="card stat-card">
            <h3>Add New Student</h3>
            <button
              className="btn"
              onClick={() => navigate('/students/add')}
            >
              Add Student
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
