const express = require('express');
const Student = require('../models/Student');
const protect = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/roleMiddleware');

const router = express.Router();

// All routes protected
router.use(protect);

// Create
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: 'Error creating student', error: err.message });
  }
});

// Get all
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Get one
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating student' });
  }
});

// Delete
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student' });
  }
});

module.exports = router;
