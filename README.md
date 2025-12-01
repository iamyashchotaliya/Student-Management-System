# 🎓 Student Management System (MERN Stack)

A complete **Student Management System** built using MERN Stack with authentication, student records, and attendance management.

---

## 🚀 Features

### 👤 Authentication
- JWT based login system
- Password encryption using bcrypt
- Role based access (Admin / Teacher)

### 📚 Student Management
- Add new student
- Update student details
- Delete student
- View student list

### 🗓 Attendance System
- Mark daily attendance
- Maintain attendance records
- History tracking

### 🧾 Admin Panel
- Manage users
- Full dashboard access

### 🎨 Frontend
- Built using React (Vite)
- Responsive UI
- Modern design

### ⚙ Backend
- Node.js and Express API
- MongoDB database
- MVC pattern

---

## 🖥 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js (Vite), CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Auth | JWT, bcrypt |
| Tools | VS Code, Postman |

---

## 🗂 Project Structure

student-management-system/
│
├── backend/
│ ├── config/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── .env
│ ├── package.json
│ ├── server.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── api/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── index.css
│ │ ├── main.jsx
│ ├── vite.config.js
│ ├── package.json
│
├── .gitignore
└── README.md


---

## 🔐 Environment Variables

Create `.env` file inside **backend folder**:

MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
PORT=5000


---

## ▶️ How to Run Project

### Backend Setup
cd backend
npm install
npm start

## Frontend Setup
cd frontend
npm install
npm run dev

---

## ✅ User Roles

- **Admin**: Only project owner has access
- **Teacher**: Can manage students and attendance


## ⭐ Support

If you found this project helpful, give it a ⭐ on GitHub
