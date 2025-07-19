const mongoose = require('mongoose')

const YearBookSchema = new mongoose.Schema({
  post_id: { type: Array, required: true },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  year: { type: Number, required: true }
})

const YearBook = mongoose.model('YearBook', YearBookSchema)

module.exports = YearBook
