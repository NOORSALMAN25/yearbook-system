const User = require('../models/User')
const Post = require('../models/Post')

exports.user_show_get = async (req, res) => {
  const user = await User.findById(req.params.id)
  // console.log(user)
  const posts = await Post.find({ creator_id: user._id })
  const data = {
    username: user.username,
    email: user.email,
    pfp: user.pfp,
    posts: posts
  }
  res.render('user/profile.ejs', { user: data })
}
