const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    userRole: { type: String, enum: ['student', 'instructor'] },
    userId: String,
    office: String,
    course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  { timestamps: true }
)

// validPassword
userSchema.methods.verifyPassword = function(password) {
  console.log(password)
  console.log(this.password)
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
