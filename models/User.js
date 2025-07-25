const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pfp: { type: String },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], 
  role: {type: String, default: 'student'}
})

const User = mongoose.model('User', userSchema)

module.exports = User
