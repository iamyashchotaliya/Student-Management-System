const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const protect = require('../middleware/authMiddleware')
const requireAdmin = require('../middleware/roleMiddleware')

const router = express.Router()

// Only admin
router.use(protect, requireAdmin)

// ✅ Get all users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
})

// ✅ Create new user (teacher/admin)
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body

  const exist = await User.findOne({ email })
  if (exist) return res.status(400).json({ message: 'User already exists' })

  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: role || 'teacher'
  })

  res.json({ message: 'User created', user })
})

// ✅ Delete user
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json({ message: 'User deleted' })
})

module.exports = router
