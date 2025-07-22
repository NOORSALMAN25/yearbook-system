const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    image: { type: String },
    quote: { type: String },
    creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
