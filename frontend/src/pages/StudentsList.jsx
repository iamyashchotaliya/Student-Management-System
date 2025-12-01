import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/apiClient'
import '../index.css'

export default function StudentsList() {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [course, setCourse] = useState('')
  const [semester, setSemester] = useState('')

  const [page, setPage] = useState(1)
  const pageSize = 5       // ✅ ek page pe kitne records

  const load = () => api.get('/students').then(r => setStudents(r.data))
  useEffect(() => { load() }, [])

  // ✅ FILTER LOGIC
  const filtered = students.filter(s => {
    const q = search.toLowerCase()
    const matchSearch =
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.course?.toLowerCase().includes(q)

    const matchCourse = course ? s.course === course : true
    const matchSem = semester ? String(s.semester) === semester : true

    return matchSearch && matchCourse && matchSem
  })

  // ✅ PAGINATION LOGIC
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * pageSize
  const paginated = filtered.slice(startIndex, startIndex + pageSize)

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const role = user.role

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete student?")) return
    try {
      await api.delete(`/students/${id}`)
      load()
    } catch (err) {
      if (err.response?.status === 403) alert("Only admin can delete")
      else alert("Delete failed")
    }
  }

  // ✅ Unique values for dropdowns
  const courses = [...new Set(students.map(s => s.course).filter(Boolean))]
  const semesters = [...new Set(students.map(s => String(s.semester)).filter(Boolean))]

  // ✅ Filters change hone par page 1 kar dena
  const handleSearchChange = e => { setSearch(e.target.value); setPage(1) }
  const handleCourseChange = e => { setCourse(e.target.value); setPage(1) }
  const handleSemChange = e => { setSemester(e.target.value); setPage(1) }

  const clearFilters = () => {
    setSearch('')
    setCourse('')
    setSemester('')
    setPage(1)
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Student Records</h1>

        {/* 🔍 FILTER BAR */}
        <div className="card filter-bar">
          <input
            placeholder="Search name / email / course..."
            value={search}
            onChange={handleSearchChange}
          />

          <select value={course} onChange={handleCourseChange}>
            <option value="">All Courses</option>
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={semester} onChange={handleSemChange}>
            <option value="">All Semesters</option>
            {semesters.map(s => <option key={s} value={s}>Sem {s}</option>)}
          </select>

          <button className="btn" type="button" onClick={clearFilters}>
            Clear
          </button>

          <Link to="/students/add" className="btn">Add Student</Link>
        </div>

        {/* 📋 TABLE */}
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Course</th><th>Semester</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.course}</td>
                  <td>{s.semester}</td>
                  <td>
                    <Link
                      to={`/students/edit/${s._id}`}
                      className="btn"
                      style={{ marginRight: '6px' }}
                    >
                      Edit
                    </Link>

                    {role === 'admin' && (
                      <button className="btn" onClick={() => deleteStudent(s._id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', opacity: .7 }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 📄 PAGINATION CONTROLS */}
          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              ‹ Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  className={`page-btn ${pageNum === currentPage ? 'active' : ''}`}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            >
              Next ›
            </button>
          </div>

        </div>

      </div>
    </>
  )
}
