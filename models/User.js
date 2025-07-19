const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  role: { type: String, enum:['teacher','student'],required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema)

module.exports = User
