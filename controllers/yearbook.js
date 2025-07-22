const Yearbook = require('../models/YearBook')
const User = require('../models/User')
const Post = require('../models/Post')

// API
exports.yearbook_create_post = async (req, res) => {
  const posts = await Post.findById(req.params.postId)
  console.log(posts)
  const yearbook = await Yearbook.create([
    {
      post_id: req.params.postId,
      creator_id: req.session.user._id,
      year: 2025
    }
  ])
  res.render('yearbook/show.ejs', { yearbook })
}

exports.yearbook_index_get = async (req, res) => {
  const yearbookPosts = await Yearbook.find({}).populate('post_id')
  res.render('yearbook/index.ejs', { yearbookPosts })
}
