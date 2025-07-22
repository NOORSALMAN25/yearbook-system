const mongoose = require('mongoose')

const yearbookSchema = new mongoose.Schema({
  image: { type: String },
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  year: { type: Number, required: true }
})

const Yearbook = mongoose.model('YearBook', yearbookSchema)

module.exports = Yearbook
