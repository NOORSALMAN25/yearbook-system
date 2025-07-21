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

exports.user_edit_get = async (req, res) => {
  const currentUser = await User.findById(req.session.user.id)
  const userId = req.params.id
    if (userId === (req.session.user.id)){
      await currentUser.updateOne(req.body);
  res.render('user/edit.ejs', { currentUser })
}
else{res.send("You don't have permission to do that.")}
}
exports.user_update_put = async (req, res) => {
  const { username, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  let updateData = { username, hashedPassword }
  if (req.file) updateData.pfp = req.file.path
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send(' Username already taken! Please choose another one.')
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true
  })
  if (req.body.password !== req.body.confirmPassword) {
    return res.send(
      'Passwords do not match or password was not entered. Please try again.'
    )
  }
  if (!updatedUser) return res.send('User not found')
  res.redirect(`/user/${req.params.id}/profile`)
}
