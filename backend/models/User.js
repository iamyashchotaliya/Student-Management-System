const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  // ✅ ROLE: admin / teacher
  role: {
    type: String,
    enum: ['admin', 'teacher'],
    default: 'teacher'
  },

  // ✅ PROFILE EXTRA FIELDS
  phone: {
    type: String
  },

  photo: {
    type: String   // Cloudinary image URL
  }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);
