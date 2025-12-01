const express = require('express');
const Attendance = require('../models/Attendance');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Sare attendance routes login ke baad hi:
router.use(protect);

// ✅ Attendance mark / update (UPSERT)
router.post('/', async (req, res) => {
  try {
    const { student, date, status } = req.body;

    // ✅ Check if already exists
    let record = await Attendance.findOne({ student, date });

    if (record) {
      // ✅ UPDATE if exists
      record.status = status;
      await record.save();

      return res.json({
        message: 'Attendance updated ✅',
        data: record
      });
    }

    // ✅ CREATE if not exists
    record = await Attendance.create({ student, date, status });
    res.json({
      message: 'Attendance saved ✅',
      data: record
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving attendance' });
  }
});

// ✅ Update attendance by student+date
router.put('/', async (req, res) => {
  try {
    const { student, date, status } = req.body;

    const updated = await Attendance.findOneAndUpdate(
      { student, date },
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'No attendance found to update' });
    }

    res.json({ message: 'Attendance updated ✅', data: updated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// ✅ Kisi date ka attendance (saare students)
router.get('/date/:date', async (req, res) => {
  try {
    const data = await Attendance.find({ date: req.params.date }).populate('student');
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching attendance' });
  }
});

// ✅ Kisi ek student ka pura history
router.get('/student/:id', async (req, res) => {
  try {
    const data = await Attendance.find({ student: req.params.id }).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student attendance' });
  }
});

// ✅ Get attendance by date
router.get('/', async (req, res) => {
  const { date } = req.query;
  const list = await Attendance.find({ date }).populate('student');
  res.json(list);
});


module.exports = router;
