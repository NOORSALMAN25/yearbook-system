const User = require('../models/User')
const Post = require('../models/Post')

exports.user_show_get = async (req, res) => {
  const currentUser = await User.findById(req.params.id)
  // console.log(currentUser)
  const data = {
    role: currentUser.role,
    username: currentUser.username,
    email: currentUser.email
  }
  res.render('user/profile.ejs', {data})
}
