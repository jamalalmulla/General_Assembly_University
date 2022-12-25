const mongoose = require('mongoose');
const User = require('./User');

const courseSchema = mongoose.Schema(
  {
    title: String,
    courseID: String,
    description: String,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    college: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
      },
    ],
  },
  { timestamp: true }
)

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
