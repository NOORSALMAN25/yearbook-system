const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')
exports.user_show_get = async (req, res) => {
  const user = await User.findById(req.params.id)
  
  const posts = await Post.find({ creator_id: user._id })
  const data = {
    _id: user._id,
    username: user.username,
    email: user.email,
    pfp: user.pfp,
    posts: posts
  }
  res.render('user/profile.ejs', { user: data })
}

exports.user_edit_get = async (req, res) => {
  const currentUser = await User.findById(req.session.user.id)
  const userId = req.params.id
    if (userId === (req.session.user.id)){
  res.render('user/edit.ejs', { currentUser })
}
else{res.send("You don't have permission to do that.")}
}
exports.user_update_put = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  let updateData = { username };

  if (password) {
    if (password !== confirmPassword) {
      return res.send('Passwords do not match. Please try again.')
    }
    const hashedPassword = bcrypt.hashSync(password, 10)
    updateData.password = hashedPassword;
  }
  if (req.file) {
    updateData.pfp = req.file.filename;
  }
  const userInDatabase = await User.findOne({ username })
  if (userInDatabase && !userInDatabase._id.equals(req.params.id)) {
    return res.send('Username already taken! Please choose another one.')
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  })

  if (!updatedUser) {
    return res.send('User not found')
  }

  res.redirect(`/user/${req.params.id}/profile`)
}