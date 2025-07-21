const Yearbook = require('../models/YearBook')
const User = require('../models/User')
const Post = require('../models/Post')

exports.yearbook_index_get = async (req, res) => {
  const user = await User.findById(req.session.user.id).populate('posts')
  const posts = user.posts
  console.log(posts)
  res.render('yearbook/index.ejs', {posts})
}
