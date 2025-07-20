const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['teacher', 'student'] },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pfp: { data: Buffer, contentType: String }
})

const User = mongoose.model('User', userSchema)

module.exports = User
