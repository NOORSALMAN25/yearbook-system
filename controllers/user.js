const User = require('../models/User')
const Post = require('../models/Post')

exports.user_show_get = async (req, res) => {
  const currentUser = await User.findById(req.params.id)
  const data = {
    role: currentUser.role,
    username: currentUser.username,
    email: currentUser.email,
    pfp: currentUser.pfp, 
    posts: currentUser.posts
  }
  res.render('user/profile.ejs', { data })
}
