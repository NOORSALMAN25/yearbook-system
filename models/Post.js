const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    image: { type: String },
    quote: { type: String, required: true },
    creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post